import React from 'react'

const Recipe = ({name, ingredients, steps}) =>
    <section id={name.toLowerCase().replace(/ /g, "-")}>
        <h1>{name}</h1>
        <ul className="ingredients">
            {ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient.name}</li>
            ))}
        </ul>
        <section className="instructions">
            <h2>조리절차</h2>
            {steps.map((step, i) => (
                <p key={i}>{step}</p>
            ))}
        </section>
    </section>

export default Recipe