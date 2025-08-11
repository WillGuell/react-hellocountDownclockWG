import React, {useEffect,useState} from "react";
import Counter from "./Counter";

//include images into your bundle




//create your first component


const Home = ({time}) => {
	const stringTime = time.toString().padStart(7,"");

const digit1 = stringTime[6]
const digit2 = stringTime[5]
const digit3 = stringTime[4]
const digit4 = stringTime[3]
const digit5 = stringTime[2]
const digit6 = stringTime[1]
const digit7 = stringTime[0]


//0 condition ? do this : do that ...like and if statement
//1
//2
//3
//4
//5
//6
	return (
		<div className="text-center">
			<span className="clock-icon bg-dark p-3 display-3">🕒</span>

				<span className = "digit1- bg-dark p-3  text-white display-3">
				{stringTime[6]}
					</span>	
				<span className = "digit2 bg-dark p-3 text-white display-3">
				{stringTime[5]}
					</span>	
				<span className = "digit3  bg-dark p-3 text-white display-3">
				{stringTime[4]}
					</span>	
				<span className = "digit4  bg-dark p-3 text-white display-3">
				{stringTime[3]}
					</span>	
				<span className = "digit5  bg-dark p-3 text-white display-3">
				{stringTime[2]}
					</span>	
				<span className = "digit6 bg-dark p-3 text-white display-3">
				{stringTime[1]}
					</span>		
				<span className = "digit7 bg-dark p-3 text-white display-3">
				{stringTime[0]}
					</span>		

		</div>
	)

};

export default Home;