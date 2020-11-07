import React, { Component } from 'react'
import './Home.css'
import 'react-dropdown/style.css';
import { Button,DateRangePicker,Input ,Alert,List,Notification} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import axios from 'axios'
import moment from 'moment'
import {BASE_URL} from '../../assets/constants'
import {Link} from 'react-router-dom'
import ListItem from '../../components/listItem/listItem'

export default class Home extends Component{

    
    
    state = {
        isLoading:true,
        searchText:'',
        fromDate:'',
        toDate:'',
        newsData:null,
        page:0,
        size:5,
        fav:[]
      }


      componentDidMount=()=>{
          //this.fetchData()
      }

    //dropdown functions  
        handleChange=(e)=> {
            console.log(e)
             this.setState({ searchText: e });
        }

    //date picker

    _onChange=(data)=>{
        
        var fromdate = moment(data[0]).format("YYYY-MM-DD")
        var todate=moment(data[1]).format("YYYY-MM-DD")
        // console.log(fromdate)
        // console.log(todate)

        this.setState({fromDate:fromdate,toDate:todate})
    }
    
    
    // button click
    _onbutton=()=>{
        //console.log('click')
        if(this.state.searchText === '' || this.state.fromDate === '' || this.state.toDate === ''){
            Alert.info('search text or dates are missing', 5000)
        }else{
            this.fetchData()
        }

    }

    // handle fav click
    _favClick=(i)=>{
        console.log(i)
        this.setState({fav:[...this.state.fav,i]},()=>{this._storeInLocal()})   //push(i)
    }

    _storeInLocal = ()=>{
        localStorage.setItem("favorites", JSON.stringify(this.state.fav));

        Notification.open({
            title: 'added to favorites',
           });

          // var retrievedData = localStorage.getItem("favorites");
          // console.log(retrievedData)
    }

    // fetching data from api
    fetchData=()=>{
        axios.get(BASE_URL+'everything', {
            params: {
             
              apiKey:'1469976fdb7a4a9198dffbd9640ac25c',
              q:this.state.searchText,
              from:this.state.fromDate,
              to:this.state.toDate
              
            }
          })
          .then((response)=> {
            //console.log(response);
            if(response.status === 200){
                this.setState({newsData:response.data.articles});
            }

          })
          .catch( (error)=> {
            console.log(error);
          })
          .then( ()=> {
            // always executed
          });  
    }


    // renders page ui below search bar
    renderUI=()=>{
        if(this.state.newsData == null){
            return(
                <div className='no-data'>
                   <h4>No Data</h4> 
                </div>
            )
        }else {
            return(
                <List sortable >
                    {this.state.newsData.map((item, index) => (
                        <ListItem 
                            key={item.publishedAt}
                            item={item} 
                            click={this._favClick}
                        >
                            
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
                <div className='nav-container'>
                    <div className='drop-container'>
                    <Input 
                        style={{ width: 300 }} 
                        placeholder="Search" 
                        value={this.state.searchText}
                        onChange={this.handleChange}
                        />
                    </div>
                    <div className='date-container'>
                        <DateRangePicker
                            appearance="default"
                            placeholder="Default"
                            style={{ width: 280 }}
                            block
                            onChange={this._onChange}
                            
                    />
                    
                    </div>
                    <div className='button-container'>
                        <Button 
                          
                            onClick={()=>{this._onbutton()}}
                            >Search</Button>
                    </div>
                    <div className='link-container'>
                        <Link to='/fav'> Go to favorites </Link>
                    </div>
                   
                </div>
                <div className='page-container'>
                    {this.renderUI()}
                </div>

            </div>
        )
    }
}