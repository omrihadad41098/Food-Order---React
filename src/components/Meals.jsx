import useHttp from '../hooks/useHttp.js';
import MealItem from './MealItem.jsx';
import Error from './Error.jsx';

const requestConfig= {}
export default function Meals () {
    const {data : loadedMeals ,isLoading,error} = useHttp('http://localhost:3000/meals', requestConfig, [])

    
    if (isLoading)
        return <p>fetching</p>

    if (error)
    {
        return <Error title="failed to fetch meals " message={error}></Error>
    }
    return <ul id="meals">{loadedMeals.map((meal)=>(
        <MealItem key={meal.id} meal={meal}/> 
    ))}</ul>
}