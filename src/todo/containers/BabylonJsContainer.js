import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoListBabylonJs from '../components/TodoListBabylonJs'

/**
 * We need all the state, since we need to make hidden todos part of scene when visibility filter changes.
 *
 * @param state 
 */
const mapStateToProps = state => {
  return state.todo
}

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListBabylonJs)