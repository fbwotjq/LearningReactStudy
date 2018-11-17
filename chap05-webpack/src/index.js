import React from 'react'
import { render } from 'react-dom'
import Menu from './components/Menu'
import data from './data/recipes'
console.log(data)
//window.React = React
render(
    <Menu recipes={data} title="맛있는 조리법" />,
    document.getElementById("react-container")
)