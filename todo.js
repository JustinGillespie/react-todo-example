var App = React.createClass({

    // Populate the application with data. Normally, this would be wired
    // up to a database, but for example purposes, it's just hardcoded.

    // If using a backend the tasks array should be blank and the first set of data
    // should be fetched in the componentDidMount() method.

    getInitialState: function() {
        return {
            categories: {
                1: "Work",
                2: "Personal",
                3: "Weekend",
                4: "Fun",
                5: "Travel"
            },
            tasks: [
                { id: 1, name: 'Clean the car', category: 3 },
                { id: 2, name: 'Walk the Dog', category: 2 },
                { id: 3, name: 'Walk the Cat', category: 2 },
                { id: 4, name: 'Brush your Teeth', category: 2 },
                { id: 5, name: 'Take a Nap', category: 3 },
                { id: 6, name: 'Check 10,000 Feet', category: 1 },
                { id: 7, name: 'Get Coffee', category: 1 },
                { id: 8, name: 'Book a flight', category: 5 },
                { id: 9, name: 'Confirm Hotel Reservations', category: 5 },
                { id: 10, name: 'Go Skydiving!', category: 4 },
                { id: 11, name: 'Take a run', category: 4 }
            ]
        };
    },

    componentDidMount: function() {
        // GET DATA FROM DATABASE AND UPDATE REACT STATE
        // this.setState({ tasks: DATA })
    },

    addTask: function(category_id, task) {
        var tasks = this.state.tasks.slice();
        if( task === "" ) return; // Prevent saving a blank task

        tasks.push({
            id: (this.state.tasks.length + 1),
            name: task,
            category: category_id
        })
        this.setState({ tasks: tasks })

        // ADD TO DATABASE
    },

    removeTask: function(task_id) {
        var tasks = this.state.tasks.slice();

        tasks.map(function(task, index) {
            if( task.id == task_id ) {
                tasks.splice(index, 1);
            }
        });

        this.setState({ tasks: tasks })

        // REMOVE FROM DATABASE
    },

    render: function() {
        var self = this;
        var categories = self.state.categories;
        var tasks = self.state.tasks;

        // .map only works on arrays and we are using a hash object so
        // calling Object.keys() will return the array of keys stored.

        var lists = Object.keys(categories).map(function(key) {

            // now loop through the tasks and only return the
            // ones that are assigned to this category

            var tasksInCurrentList = tasks.map(function(task) {
                if( key == task.category) {
                    return <Task name={task.name} id={task.id} removeTask={self.removeTask} />;
                }
            });

            return(
                <div className="list">
                    <h1>{ categories[key] }</h1>
                    { tasksInCurrentList }
                    <TaskFormInput category={key} addTask={self.addTask} />
                </div>
            );
        });

        return(
            <div className="lists">
                {lists}
            </div>
        );
    }
});


// Task Component

var Task = React.createClass({
    render: function() {
        return(
            <div className="task" onClick={this.props.removeTask.bind(null, this.props.id)}>
                {this.props.name}
            </div>
        )
    }
});


// Task Form Input Component

var TaskFormInput = React.createClass({
    getInitialState() {
        return {
            value: ""
        };
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },

    handleSubmit: function(e) {
        e.preventDefault();
        this.props.addTask(this.props.category, this.state.value);
        this.setState({ value: "" });
    },

    render: function() {
        return(
            <form className="task-form" onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange} placeholder="Add a Task" value={this.state.value} />
            </form>
        )
    }
});


// Render App to DOM

React.render( <App />, document.getElementById('content') );
