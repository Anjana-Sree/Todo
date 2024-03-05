import React, { useState } from 'react';
import iconSun from './Assets/iconSun.svg';
import iconMoon from './Assets/iconMoon.svg';
import iconCheck from './Assets/iconCheck.svg';
import lightBg from './Assets/lightBg.jpg';
import darkBg from './Assets/darkBg.jpg';

const Main = () => {
    const [firstInputValue, setFirstInputValue] = useState('');
    const [todos, setTodos] = useState([]);
  
    const [completedTodos, setCompletedTodos] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(darkBg);
    const [iconImage, setIconImage] = useState(iconSun);
    const [bottomBackgroundColor, setBottomBackgroundColor] = useState('rgb(24, 21, 44)');

    const handleInputChange = (e) => {
        setFirstInputValue(e.target.value);
    };

    const addTodo = () => {
        if (firstInputValue.trim() !== '') {
            setTodos([...todos, { text: firstInputValue, completed: false }]);
            setFirstInputValue('');
        }
    };

    const toggleComplete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
        if (updatedTodos[index].completed) {
            setCompletedTodos([...completedTodos, updatedTodos[index]]);
        } else {
            setCompletedTodos(completedTodos.filter((todo) => todo !== updatedTodos[index]));
        }
    };

    const CompletedTodos = ({ completedTodos }) => {
        return (
            <div>
                {completedTodos.map((todo, index) => (
                    <div key={index} className='textwithBtn'>
                        <input className='text' type='text' value={todo.text} readOnly />
                        <img src={iconCheck} className='iconCheckimg' alt="Image" />
                      
                    </div>
                ))}
            </div>
        );
    };

    const ClearTodos = () => {
        setCompletedTodos([]);
        setTodos(todos.filter(todo => !todo.completed));
    };

    const isClicked = (index) => {
        return todos[index].completed;
    };

    const handleIconClick = () => {
        if (iconImage === iconMoon) {
            setBackgroundImage(darkBg);
            setIconImage(iconSun);
            setBottomBackgroundColor('rgb(24, 21, 44)')
            
        } else {
            setBackgroundImage(lightBg);
            setIconImage(iconMoon);
            setBottomBackgroundColor('white');
        }
    };

    return (
        <div className="home" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="top">
                <p className='heading' style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Todo</p>
                <button className='brightnessIcon' onClick={handleIconClick}>
                    <img src={iconImage} alt="Icon" />
                </button>

                <input type='text' className='textarea' value={firstInputValue} onChange={handleInputChange} onKeyPress={(e) => { if (e.key === 'Enter') addTodo() }} />

                <div className='todo-list'>
                    {showCompleted ? (
                        <CompletedTodos completedTodos={completedTodos} />
                    ) : (
                        todos.map((todo, index) => (
                            <div key={index} className='textwithBtn'>
                                {isClicked(index) ? (
                                    <img src={iconCheck} className='iconCheckimg' alt="Image" />
                                ) : (
                                    <button className='cancelBtn' onClick={() => toggleComplete(index)}></button>
                                )}
                                <input className='text' type='text' value={todo.text} readOnly style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'grey' : 'white' }} />
                                <button className='xButton'>X</button>
                            </div>
                        ))
                    )}
                <div className='bottomNav'>
               <button className='status' onClick={() => setShowCompleted(false)}>All</button>
               <button className='status' onClick={() => setShowCompleted(false)}>Active</button>
               <button className='status' onClick={() => setShowCompleted(!showCompleted)}>Completed</button>
               <button className='status' onClick={ClearTodos}>Clear completed</button>
               </div>

                </div>
            </div>
            <div className="bottom" style={{ backgroundColor: bottomBackgroundColor }}></div>
        </div>
    );
}

export default Main;
