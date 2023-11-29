import { useState, useEffect, useRef, useReducer } from 'react';
import TaskItem from './components/TaskItem';
import logoTodo from './assets/images/logoTodo.png'

/* Create reducer qui prend en paramétre de fonction
`state` = c'est un objet qui représente les états locaux
`action` = c'est un objet qui contient 
`type` permettant de définir les différentes action possible
*/
const reducer = function (state, action) {
  switch (action.type) {
    case 'onChange':
      if (state.taskFilter && action.payload === '') {
        return { ...state, taskFilter: null, textEntered: action.payload };
      }

      /*
      Quand on modifie le `state` il faut le copier en utilisant le `spread operator`
      Pour éviter de supprimer des états locaux (state) de notre reducer
      */
      return { ...state, textEntered: action.payload };

    case 'getTasksLocalStorage':
      const tasksLocalStorage = JSON.parse(localStorage.getItem('my-tasks'));

      /*
      On vérfie si on reçoit des données du localStorage
      si c'est le cas on met le state `tasks`
      sinon on retourne le state sans AUCUNE modification
      */
      if (tasksLocalStorage) {
        return { ...state, tasks: tasksLocalStorage };
      } else {
        return { ...state };
      }

    case 'addTask':
      const newTasks = [...state.tasks, state.textEntered];
      // Stock les taches dans le localstorage
      localStorage.setItem('my-tasks', JSON.stringify(newTasks));
      return { tasks: newTasks, textEntered: '' };

    case 'removeTask':
      const arr = [...state.tasks];

      /* 
      `taskCurrent` évalue si `state.taskFilter` existe (utilisateur a fait une recherche)
      si c'est le cas il prendra la valeur de ce dernier sinon le prend la valeur
      de notre tableau d'origine (`state.task`)
      */
      const tasksCurrent = state.taskFilter || arr;
      /*
      🚨🚨 ATTENTION 🚨🚨
      Quand on stock le resulat de la `splice` on récupére l'element supprimer
      exemple : 
      const delete = arr.splice(action.payload, 1);

      -----
      `splice` permet de supprimer un élément d'une liste (tableau) en utilisant 
      son `index` 

      exemple:
      const animals = ["dog", "cat", "elephant"];
      animals.splice(2, 1);
      // ["dog", "cat"]
      */

      const newFilterTask = tasksCurrent.filter(
        (item) => item !== action.payload
      );

      arr.splice(arr.indexOf(action.payload), 1);
      // Stock les taches dans le localstorage
      localStorage.setItem('my-tasks', JSON.stringify(arr));

      return {
        ...state,
        tasks: arr,
        taskFilter: state.taskFilter ? newFilterTask : null,
      };

    case 'searchTask':
      const taskSearch = state.tasks.filter((item) =>
        item.toLowerCase().includes(state.textEntered.toLowerCase())
      );
      return { ...state, taskFilter: taskSearch };

    default:
      break;
  }
};

function App() {
  /*   function welcome(name) {
    console.log(`welcome ${name}`);
  }

  welcome('John Doe'); */
  const initialValue = {
    tasks: [],
    taskFilter: null,
    textEntered: '',
  };
  const [state, dispatch] = useReducer(reducer, initialValue);

  /* 
useffect sera exécute au montage du composant
*/
  useEffect(() => {
    dispatch({ type: 'getTasksLocalStorage' });
  }, []);

  const onChangeHandler = (e) =>
    dispatch({ type: 'onChange', payload: e.target.value });

  const addTaskHandler = function (event) {
    event.preventDefault();
    dispatch({ type: 'addTask', payload: event });
  };

  const searchTaskHandler = function (event) {
    event.preventDefault();
    dispatch({ type: 'searchTask', payload: event });
  };

  const tasks = state.taskFilter || state.tasks;

  return (
    <main className="bg-slate-900 min-h-screen pt-5 px-10">
      {/*       <h1 className="text-slate-50 text-3xl font-bold text-center mb-10">
        TODO APP
      </h1> */}
      {/*  <img src={logo} alt="image" className="block mx-auto" /> */}
      <img src={logoTodo} alt="logo-todo" className="block mx-auto" />

      {/* Input pour taper une tache */}
      <form
        // onSubmit={addTaskHandler}
        className="flex justify-center items-center gap-4">
        <input
          // A chaque saisi sur le input la fonction est rééxecuter
          // Avec le paramétre `event` on peut accéder à l'élément `input`
          // Donc à sa valeur `event.target.value`
          onChange={onChangeHandler}
          value={state.textEntered}
          type="text"
          className="w-full md:w-2/3"
          // ref={inputRef}
        />
        <input
          type="submit"
          value="Add Task"
          onClick={addTaskHandler}
          className="text-yellow-400 text-2xl"
        />
        <input
          type="submit"
          value="Search Task"
          onClick={searchTaskHandler}
          className="text-gray-400 text-2xl"
        />
      </form>

      <section className="mt-10 md:w-2/3 mx-auto ">
        <ul className="flex flex-col space-y-5">
          {/* 
          La méthode `map` va parcourrir le liste (tableau) et retourner (afficher) les éléments de la liste (tableau) dans le DOM
          Elle attend une fonction en `callback` la fonction recevra
          chaque élément du tableau via les paramétres
          Donc dans notre exemple `item` représente chaque élément de la liste `tasks`
          */}

          {tasks.map((item, index) => (
            /* 
            La propriété `key` est utilisée pour identifier
            chaque élément enfant générer par la méthode `map`
            */
            <TaskItem
              key={index}
              name={item}
              removeItem={() => dispatch({ type: 'removeTask', payload: item })}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

/* 

Créer un composant nommé `TaskItem` qui représente le UI de chaque `item`
de la liste `tasks` 



*/

export default App;
