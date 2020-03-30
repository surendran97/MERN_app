import React,{Component} from 'react';
import DatePicker from 'react-datepicker'
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css"
import  userImage from "../user.jpg"
import "../App.css"

export default class EditExercise extends Component{
    constructor(props){
        super(props);
    
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangeDiscription=this.onChangeDiscription.bind(this);
        this.onChangeDuration=this.onChangeDuration.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
this.onSubmit=this.onSubmit.bind(this)
        this.state={
            username:'',
            description:'',
            duration:0,
            date: new Date(),
            users:[]
        }
    }

componentDidMount(){
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
    .then(response=>{this.setState({
        username:response.data.username,
        description:response.data.description,
        duration:response.data.duration,
        date:new Date(response.data.date)
    })})
  axios.get('http://localhost:5000/user/')
  .then(response=>{
      if(response.data.length > 0){
          this.setState({
              users:response.data.map(user =>user.username),
              
          })
      }

  })
}
    onChangeUsername(e){
        this.setState({
            username:e.target.value
        })

    }


    onChangeDiscription(e){
        this.setState({
            description:e.target.value
        })

    }


    onChangeDuration(e){
        this.setState({
            duration:e.target.value
        })

    }


    onChangeDate(date){
        this.setState({
            date:date
        })
    }
        onSubmit(e){
            e.preventDefault();

            const exercise={
                username:this.state.username,
                description:this.state.description,
                duration:this.state.duration,
                date:this.state.date
            }

            console.log(exercise)
            
            
            axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id,exercise)
            .then(res => alert(res.data))
            
            .catch((err)=>err)
    

         
           
        }

      
    render(){
        return(
            <div className="   pl-3 row">
            <div class="col-6">
            <h3>Edit New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group align-item-center row">
                  <div class="col-12">
                  <label>UserName:</label>
                  <select ref="userInput"
                  required
                  className="form-control form-control-sm"
                  value={this.state.username}
                  onChange={this.onChangeUsername}>
                      {
                          this.state.users.map((user)=>{
                              return  <option
                            key={user}
                            value={user}>{user}</option>
                          })
                      }
                  </select>
              </div>
              </div>
              <div className="form-group align-item-center row">
              <div class="col-12">
                  <lable>Description:</lable>
                  <input type="text"
                  required
                  className="form-control form-control-sm"
                  value={this.state.description}
                  onChange={this.onChangeDiscription}/>
              </div>
              </div>
              <div className="form-group align-item-center row">
              <div class="col-12">
                  <lable>Duration(in minutes):</lable>
                  <input type="text"
                  required
                  className="form-control form-control-sm"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}/>
              </div>
              </div>
              <div className="form-group align-item-center row">
              <div class="col-12">
                  <lable>Date:</lable>
                 <div>
                     <DatePicker
                     selected={this.state.date}
                     onChange={
                         this.onChangeDate
                     }
                     />
                 </div>
                 </div>
              </div>
              <div className="form-group ">
                  <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
              </div>
              
            </form>
            
            </div>
            
            <div className="  col-4 offset-2" >
              <img src={userImage} className="img1"></img>
              <div className="mt-1">
                    Name:<lable className="ml-5">{this.state.username}</lable><br/>
                    <br/>
                    Description:<lable className="ml-5">{this.state.description}</lable>
                    <br/><br/>
                    Duration:<lable className="ml-5">{this.state.duration}</lable>
                    <br/><br/>
                    Date:<lable className="ml-5"></lable>
                    </div>    
                  
            </div>
            </div>
        )
    }
}



