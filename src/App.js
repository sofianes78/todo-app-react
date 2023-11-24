import { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import logo from './assets/images/logo.png';

function App() {
  // 1 er sera la valeur de votre state
  // 2e sera la fonction qui permet de mettre à jour le state
  // TOUJOURS LE DÉCLARER AU TOP DE LA FONCTION 💥
  const [textEntered, setTextEntered] = useState('');
  const [tasks, setTasks] = useState([]);
  /* 
Le useEffect il permet d'excuter le code au montage du composant
*/
  useEffect(() => {
    // Le localStorage retourne un string donc il faut utiliser `JSON.parse ` pour le convertir en tableau ou objet
    const tasksList = JSON.parse(localStorage.getItem('my-tasks'));
    if (tasksList) {
      setTasks(tasksList);
    }
  }, []);
  console.log(tasks);

  const onChangeHandler = function (event) {
    // event.target => document.querySelector('input)
    // `event.target.value` permet de récuperer la valeur d'un input
    // 👆 Il fonctionne qu'avec les balises formulaires (input, select)
    // event.target.classList.add('red') // ajoute la class `red` quand on entre une saissie
    setTextEntered(event.target.value);
  };

  const addTaskHandler = function (event) {
    // A ajouter pour TOUT formulaire utilisant une balise `form`
    // Elle permet de ne pas recharger la page au submit
    event.preventDefault();
    // NE PAS UTILISER AINSI QUAND ON VEUT METTRE A JOUR UNE LISTE
    // tasks.push(textEntered);

    // La bonne méthode : utiliser le `spread operator` qui permet de copier
    // une liste (tableau) puis ajouter le nouvelle tâche
    const newArr = [...tasks, textEntered];
    setTasks(newArr);

    setTextEntered('');
    // Stock les taches dans le localstorage
    localStorage.setItem('my-tasks', JSON.stringify(newArr));
  };
  console.log(tasks);

  return (
    <main className="bg-slate-900 min-h-screen pt-5 px-10">
      {/*       <h1 className="text-slate-50 text-3xl font-bold text-center mb-10">
        TODO APP
      </h1> */}
      {/*  <img src={logo} alt="image" className="block mx-auto" /> */}
      <img src={'/images/logo.png'} alt="image" className="block mx-auto" />

      {/* Input pour taper une tache */}
      <form
        onSubmit={addTaskHandler}
        className="flex justify-center items-center gap-4">
        <input
          // A chaque saisi sur le input la fonction est rééxecuter
          // Avec le paramétre `event` on peut accéder à l'élément `input`
          // Donc à sa valeur `event.target.value`
          onChange={onChangeHandler}
          value={textEntered}
          type="text"
          className="w-full md:w-2/3"
        />
        <input
          type="submit"
          value="Add Task"
          className="text-yellow-400 text-2xl"
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
              removeItem={() => {
                // On copie la ref de tasks donc `newArr` est lié a `tasks`
                const newArr = [...tasks]; // ref 001 - ref 002

                newArr.splice(index, 1);

                setTasks(newArr); // ref 001
              }}
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
  