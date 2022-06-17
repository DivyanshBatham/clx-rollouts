import ViewList from "../Components/List.js"


export default function RolloutView(props) {
    
    return (
        <div className= {styles.container}> 
            <h1> Rollout details</h1>
            <ViewList />
            
        </div>
    );
    
}