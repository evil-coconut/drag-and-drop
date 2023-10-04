import React, { useState } from "react";

import './styles/App.css'
import classes from "./styles/Item.module.css"
import mabel from './../public/mabel.jpg'
import dipper from './../public/dipper.jpg'
import stan from './../public/stan.jpg'

function App() {
  const [list, setList] = useState([
    {id: 1, img: mabel, author: 'Мэйбл', phrase: 'Что ж, пора раскрыть карты. Бум, банка... У этой девочки свиданка!!!', order: 1},
    {id: 2, img: dipper, author: 'Диппер', phrase: 'Меня зовут Диппер. А девчонка, которую тошнит, — моя сестра Мэйбл.', order: 2},
    {id: 3, img: dipper, author: 'Диппер', phrase: 'Я не верю людям, у которых начёс больше головы.', order: 3},
    {id: 4, img: stan, author: 'Стэн', phrase: 'Пока вокруг нет полиции, все законно!', order: 4},
    {id: 5, img: stan, author: 'Стэн', phrase: '«Должен ли мужчина платить за ужин?». Мы что, в России, что ли?', order: 5},
    {id: 6, img: stan, author: 'Стэн', phrase: 'Ну вот, Стэн. Новый день и новая боль в новом месте.', order: 6},
  ])

  const [currentItem, setCurrentItem] = useState(null)

  function dragStartHandler(e, item) {
    setCurrentItem(item)
  }

  function dragEndHandler(e) {}

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dropHandler(e, item) {
    e.preventDefault();
    setList(list.map(c => {
      if(c.id === item.id) {
        return {...c, order: currentItem.order}
      }
      if(c.id === currentItem.id) {
        return {...c, order: item.order}
      }
      return c
    }))
  }

  const sortCards = (a, b) => {
    if(a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }
  
  return (
    <div className='App'>
      {list.sort(sortCards).map(i =>
        <div 
          onDragStart={(e) => dragStartHandler(e, i)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, i)}
          draggable={true} 
          className={classes.item_body}
          key={i.id}
        >
          <img className={classes.item_icon} src={i.img} alt='' />
          <div className={classes.item_text}>
            {i.phrase}
          </div>
          <div className={classes.item_author}>
            {i.author}
          </div>
        </div>
      )}
    </div>
  )
}

export default App