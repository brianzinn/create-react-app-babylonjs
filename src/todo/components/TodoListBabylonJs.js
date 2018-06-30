import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FreeCamera, Vector3, Mesh, HemisphericLight } from 'babylonjs';
import { AdvancedDynamicTexture, StackPanel, Checkbox, Control } from 'babylonjs-gui'

import { Scene as ReactBabylonJsScene, registerHandler, removeHandler } from 'react-babylonjs';

class TodoListBabylonJs extends Component {

    guiTodos = [];

    constructor(props) {
        super(props);

        this.panel = new StackPanel();
    }

    onMeshPicked = (mesh, scene) => {
        // console.log('mesh picked', mesh);
    }

    onSceneMount = (e) => {
        const { canvas, scene, engine} = e

        // Scene to build your environment, Canvas you need to attach your camera.       
        var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        var sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        advancedTexture.addControl(this.panel);

        this.props.todos.forEach(todo => {
            this.addToDoToGui(todo);
        })

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    }

    addToDoToGui = (todo) => {
        var checkbox = new Checkbox();
        checkbox.width = "20px";
        
        checkbox.isChecked = todo.completed;
        checkbox.color = "green";
        checkbox.onIsCheckedChangedObservable.add((value) => {
            // hack to prevent infinite recursion when we toggle todo.
            checkbox._isChecked = (!value); // undo and then we toggle.
            this.props.toggleTodo(todo.id);
        });

        var header = Control.AddHeader(checkbox, todo.text, "180px", { isHorizontal: true, controlFirst: true});
        
        switch(this.props.visibilityFilter) {
            case 'SHOW_ALL':
                header.height = '30px';
                checkbox.height = '20px';
                break;
            case 'SHOW_ACTIVE':
                header.height = (todo.completed ? '0px' : '30px');
                checkbox.height = (todo.completed ? '0px' : '20px');
                break;
            case 'SHOW_COMPLETED':
                header.height = (todo.completed ? '30px' : '0px');
                checkbox.height = (todo.completed ? '20px' : '0px');
                break;
            default:
                console.error('unknown filter', this.props.visibilityFilter);
        }

        header.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.panel.addControl(header);

        this.guiTodos.push({
            todo,
            checkbox,
            header
        })
    }

    shouldComponentUpdate = (nextProps) => {
        return true; // can be used to reduce render calls.
    }

    componentDidMount = () => {
        // you can add listeners to redux actions - they are intercepted by the middleware.
        this.actionHandlersMap = {
            'TOGGLE_TODO': (action) => {
                var guiTodo = this.guiTodos.find(guiTodo => guiTodo.todo.id === action.id);

                if (guiTodo === undefined) {
                    console.error('cannot find todo to toggle:', action);
                    return true;
                }

                // setting isChecked causing infinite recursion:
                guiTodo.checkbox._isChecked = !guiTodo.checkbox.isChecked;
                guiTodo.todo.completed = !guiTodo.todo.completed
                guiTodo.checkbox._markAsDirty();
                return true;
            },
            'ADD_TODO': (action) => {
                this.addToDoToGui({
                    id: action.id,
                    text: action.text,
                    completed: false
                })
                return true; // indicates to middleware that it was handled
            },
            'SET_VISIBILITY_FILTER': (action) => {
                this.guiTodos.forEach(guiTodo => {
                    let completed = guiTodo.todo.completed;

                    switch(action.filter) {
                        case 'SHOW_ALL':
                            guiTodo.header.height = '30px';
                            guiTodo.checkbox.height = '20px';
                            break;
                        case 'SHOW_ACTIVE':
                            guiTodo.header.height = (completed ? '0px' : '30px');
                            guiTodo.checkbox.height = (completed ? '0px' : '20px');
                            break;
                        case 'SHOW_COMPLETED':
                            guiTodo.header.height = (completed ? '30px' : '0px');
                            guiTodo.checkbox.height = (completed ? '20px' : '0px');
                            break;
                        default:
                            console.error('unknown filter', action.filter);
                    }
                })
            }
        };

        this.actionHandler = (action) => {
            if (this.actionHandlersMap[action.type] === undefined) {
                console.log(`no handler defined in TodoListBabylonJs for '${action.type}'`, action);
                return false;
            } else {
                const defaultHandler = this.actionHandlersMap[action.type];
                return defaultHandler(action);
            }
        }

        registerHandler(this.actionHandler);
    }

    componentWillUnmount = () => {
        removeHandler(this.actionHandler);
    }

    render() {
        return (
            <div style={{height:'400px'}}>
                <ReactBabylonJsScene
                    id="todoCanvas"
                    visible
                    onMeshPicked={this.onMeshPicked}
                    onSceneMount={this.onSceneMount}
                />
            </div>
        )
    }
}

TodoListBabylonJs.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  toggleTodo: PropTypes.func.isRequired
}

export default TodoListBabylonJs