import React, {Component} from "react";
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from "../item-status-filter";
import TodoList from '../todo-list';
import ItemAddForm from "../item-add-form";
import "./app.scss";

export default class App extends Component{
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Learn React'),
      this.createTodoItem('Go to ATB Market')
    ],
    term: '',
    filter: 'all'  // all, active, done
  };

  createTodoItem (label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }
  
  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newTodoData = [...todoData.slice(0, idx), ...todoData.slice(idx+1)];
      return {
        todoData: newTodoData
      };
    })
  };

  addItem = (text) => {
    if(text.length > 0) {
      const newItem = this.createTodoItem(text);

      this.setState(({todoData}) => {
        const newTodoData = [...todoData, newItem];
        return {
          todoData: newTodoData
        };
      })
    }
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]}
      
      return [...arr.slice(0, idx), newItem, ...arr.slice(idx+1)];
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  onSearchChange = (term) => {
    this.setState({term});
  };

  filter = (items, filter) => {
    switch(filter) {
      case 'all':
        return items;
      case 'active': 
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default: 
        return items;  
    }
  };

  onFilterChange = (filter) => {
    this.setState({filter});
  };

  render() {
    const {todoData, term, filter} = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    
    return (
      <div className="app">        
        <div>
          <AppHeader todo={todoCount} done={doneCount}/>
        </div>
        <div className="search-filter">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
       </div>
          <TodoList todos={visibleItems} onDeleted={this.deleteItem} onToggleImportant={this.onToggleImportant} onToggleDone={this.onToggleDone}/>
          <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
}