export default function SayHi(props){
    console.log(props);
    return <h1>welcome {props.name} {props.age } years old, your job is {props.job}</h1>;

}
