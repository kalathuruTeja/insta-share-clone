import React,{ Component } from 'react'
import Header from '../Header'
import Footer from '../Footer'

class Home extends Component {
  render() {
    return (
     <>
     <div>
        <h3> Welcome to Reactjs </h3>
        
         <h1> Welcome To Header and Footer Pages </h1>
         <Header/>
        <Footer/>
     </div>
     
     </>
    )
  }
}
export default Home

