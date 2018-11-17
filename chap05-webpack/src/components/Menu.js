import React from 'react'
import Recipe from './Recipe'
import '../stylesheets/Menu.css'

const Menu = ({recipes, title}) => (
    <article>
        <header>
            <h1>{title}</h1>
        </header>
        <div className="recipes">
            {
                recipes.map((recipe, i) => <Recipe key={i} {...recipe} />)
                /**
                 * <Recipe key={i}
                 * name={recipe.name}
                 * ingredients={recipe.ingredients}
                 * steps={recipe.steps}
                 />
                 */
            }
        </div>
    </article>
)

export default Menu