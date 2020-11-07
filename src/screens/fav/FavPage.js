import React , { Component }from 'react'
import './FavPage.css'
import { List} from 'rsuite';
import ListItem from '../../components/listItem/listItem'

class FavPage extends Component {

    state={
        favData:null
    }

    componentDidMount=()=>{

        var retrievedData = localStorage.getItem("favorites");
        
        this.setState({favData:JSON.parse(retrievedData)})
      
    }

    renderUI=()=>{
        if(this.state.favData == null){
            return(
                <div className='no-data'>
                   <h4>No Data</h4> 
                </div>
            )
        }else {
            return(
                <List sortable >
                    {this.state.favData.map((item, index) => (
                        <ListItem 
                        key={item.publishedAt}
                        item={item} >
                            
                        </ListItem>
                    ))}
                </List>
            )
        }

    }


    render(){
        console.log(this.state)
        return(
            <div className='container'>
                <div className='page-container'>
                    {this.renderUI()}
                </div>
            </div>
        )
    }
}

export default FavPage