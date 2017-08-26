import React, { Component } from 'react';
import './Todo.css';

function HelpLink() {
        return <div className="medium-2 medium-offset-10 columns">
                <a href="#">Help</a>
            </div>;
}

class TaskList extends Component {
    render() {
            let items = [];
            let todos = this.props.todos;

            if(todos.length === 0)
                return (
                    <div>Do you really have nothing to do today ?</div>
                );

                for (let index in todos) {

                    let todo = todos[index];

                    if(todo.show){
                        items.push(
                            <TodoItem todo={todo} key={index} changeState={this.props.changeState} reomveItem={this.props.removeItem}/>
                        )
                    }
                }

            return (
                <div>
                    {items}
                </div>
                );
        }
}

class TodoItem extends React.Component {
    completed(e) {
        e.preventDefault();

        this.props.changeState(this.props.todo);
    }

    remove = (e) => {
        e.preventDefault();

        this.props.reomveItem(this.props.todo);
    }

    render() {
            let todo = this.props.todo;

            return (     
                <div className="row">
                    <div className="medium-1 columns">
                        <input type="checkbox" onChange={this.completed.bind(this)} value={this.props.completed}/>
                    </div>
                    <div className="medium-9 columns">
                        {todo.completed ? (
                        <del>{todo.text}</del>
                        ) : (                        
                        <label>{todo.text}</label>
                        )}
                    </div>
                    <div className="medium-2 columns">
                        <button className="hollow button alert" onClick={this.remove.bind(this)}>X</button>
                    </div>
                </div>                       
            );
        }
}

class FilterTasks extends Component {

    filterList(e){
        e.preventDefault();
        
        this.props.filterList(e.target.value)
    }

    render() {
		    return (
                <div>
                    <div className="medium-2 medium-offset-4 columns">
                        <select onChange={this.filterList.bind(this)}>
                            <option value="All">All</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>   
                </div>
            );
        }
}

class AddTask extends Component {

    createNewTask(e) {
        //Prevent the default behavior of the form onSubmit event
        //see synthetic event
        e.preventDefault();

        let todoText = this.refs.newTodo.value;

        if (todoText) {

            //call the create task method that is passed from the parent component via props
            this.props.createTask(todoText);

            //Blank out the text box
            this.refs.newTodo.value = '';
        }
    }

    render() {
		    return (
                <div>
                    <form onSubmit={this.createNewTask.bind(this)}>
                        <div className="medium-push-1 medium-9 columns">
                            <input type="text" ref="newTodo" placeholder="Please enter something todo you lazy bum"/>
                        </div>
                        <div className="medium-2 columns">
                            <button className="button success" type="submit">+</button>
                        </div>
                    </form>
                </div>
            );
        }
}

class ManageTasks extends Component {

    clearAllTasks(e) {
        //Prevent the default behavior of the form onSubmit event
        //see synthetic event
        e.preventDefault();

        this.props.clear();
    }

    completeAllTasks(e) {
        //Prevent the default behavior of the form onSubmit event
        //see synthetic event
        e.preventDefault();

        this.props.complete();
    }

    render() {
		    return (
                <div>
                    <div className="medium-6 columns">
                        <input type="checkbox" onChange={this.completeAllTasks.bind(this)}/><label for="checkbox1">Mark all as complete</label>
                    </div>
                    <div className="medium-2 medium-offset-4 columns">
                        <button className="button alert" onClick={this.clearAllTasks.bind(this)}>X</button>
                    </div>
                    <div className="medium-12 columns">
                        <hr/>
                    </div>
                </div>
            );
        }
}

class Todo extends Component {

//Set up all of your values
  constructor(props) {
    //Pass the props to the base constructor
    super(props);


    //Allow for the use of this.event in the components
    this.createTask = this.createTask.bind(this);
    this.changeTaskState = this.changeTaskState.bind(this);
    this.clearTasks = this.clearTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.completeTasks = this.completeTasks.bind(this);
    this.filterTaskList = this.filterTaskList.bind(this);
    

    this.state = {
        todos: [
        ]
    };
  }

  //DOM life cycle hooks

  //Fires when the DOM is rendered for the first time
  componentDidMount() {

    //You can update states independently with seperate set state calls
    /*
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
    */
  }

  //Fires when the DOM produced by the object is removed 
  componentWillUnmount() {
  }


    createTask(text) {
        this.state.todos.push({
            text,
            completed: false,
            show: true
        });
        
        this.setState({todos: this.state.todos});
    }

    changeTaskState(todo) {

        let index = this.state.todos.indexOf(todo);

        this.state.todos[index].completed = !todo.completed;

        this.setState({todos: this.state.todos});
    }

    clearTasks = () => {
        this.setState({ todos: []});
    }

    completeTasks = () => {
        this.state.todos.map(function(task) { 
            task.completed  = true; 
        });

        this.setState({ todos: this.state.todos});
    }

    removeTask = (todo) => {
        let index = this.state.todos.indexOf(todo);

        let removed = this.state.todos.splice(index, 1)

        this.setState({ todos: this.state.todos});
    }

    filterTaskList(state){

        this.state.todos.map(function(task) { 

            task.show = false;

            switch(state) {
                case "Active":
                    if(!task.completed)
                        task.show =  "true";
                    break;
                case "Completed":
                    if(task.completed)
                        task.show =  "true";
                    break;
                default:
                    task.show = "true";  
            }
        });

        this.setState({ todos: this.state.todos});
    }


	render() {
		return (
		    <div className="row">
                <div className="medium-6 medium-centered columns">
                    <div className="row">
                        <HelpLink />
                        <br/>
                        <br/>
                    </div>
                    <div className="row">
                        <ManageTasks clear={this.clearTasks} complete={this.completeTasks}/>
                    </div>
                    <div className="row">
                        <TaskList todos={this.state.todos} changeState={this.changeTaskState} removeItem={this.removeTask}/>
                    </div>
                    <div className="row">
                       <div className="medium-12 columns">
                            <hr/>
                        </div> 
                        <AddTask createTask={this.createTask} />
                        <div className="medium-12 columns">
                            <hr/>
                        </div>                        
                        <FilterTasks todos={this.state.todos} filterList={this.filterTaskList}/>
                    </div>                                       
                </div>
            </div>
		);
	}
}

export default Todo;
