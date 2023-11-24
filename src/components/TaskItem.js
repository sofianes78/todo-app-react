import { FcFullTrash } from "react-icons/fc";


export default function TaskItem() {
    return (
      <li
       
        className=" flex items-center justify-between px-8 bg-slate-100 text-center py-4 rounded shadow shadow-slate-400">
        {props.name}
        <FcFullTrash onClick={props.removeItem} className="w-6 h-6"/>
      </li>
    );
  }
  