import { Component } from 'react'
import { ColorRing } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import StoriesList from '../StoriesList'
import './index.css'

//import StoriesList from 'components/StoriesList'

const apiStoriesStatus = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

class Stories extends Component {

    state={
        storiesList:[],
        apiStatusStories :apiStoriesStatus.initial
    }

    componentDidMount(){
        this.getStoriesDetails()
    }

      getStoriesDetails = async()=>{
        this.setState({apiStatusStories :apiStoriesStatus.inProgress})

        const Token = Cookies.get('jwt_tokens')
        const apiUrl = 'https://apis.ccbp.in/insta-share/stories'

        const options ={
            method :'GET',
            headers :{
                Authorization: `Bearer ${Token}`,
            },
        }

        const response = await fetch(apiUrl,options)
        if(response.ok){
            //console.log("Ok")
            const data =  await response.json()
            const updatedData ={
                usersStories : data.users_stories.map(each =>({
                    userId : each.user_id,
                    userName : each.user_name,
                    storyUrl : each.story_url
                })),
            }
            this.setState({
                storiesList: updatedData,
                apiStatusStories: apiStoriesStatus.success,
              })
        }
        else{
            this.setState({apiStatusStories :apiStoriesStatus.failure})
        }
      }

    renderLoadingView = () =>(
        <div className="loader-container" testid="loader">
            <ColorRing type="TailSpin" color="#4094EF" width={50} height={50} />
        </div>
    )

    renderSuccessView =()=>{
        const {storiesList} = this.state 
        return <StoriesList  storiesList={storiesList}/>
    }

    onTryAgain = () =>{
        this.setState(
            {apiStatusStories: apiStoriesStatus.inProgress},
            this.getStoriesDetails,
        )   
    }

    renderFailureView = ()=>(
        <div className="failure-view">
            <img src="https://res.cloudinary.com/dq7imhrvo/image/upload/v1643651534/insta%20Shere%20clone/alert-triangle_hczx0o.png"
               alt="failure view"
                className="failure-img"
            />
            <p className="failure-heading" >omething went to worng. Please Try again</p>
            <button className="failure-button" type="button" onClick={this.onTryAgain}>Try Again</button>
        </div>
    )

    renderStoriesView = () =>{
        const {apiStatusStories} = this.state
        switch (apiStatusStories){
            case apiStatusStories.success:
                return this.renderSuccessView()
            case apiStatusStories.failure:
                return this.renderFailureView()
            case apiStatusStories.inProgress:
                return this.renderLoadingView()
            default :
            return null 
    
            }
    }

  render() {
    return this.renderStoriesView() 
  }
}
export default  Stories
