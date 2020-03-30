import React,{Component} from 'react';
import DatePicker from 'react-datepicker'
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css"
import  userImage from "../user2.png"
import "../App.css"
export default class CreateExercise extends Component{
    constructor(props){
        super(props);
    
        this.onChangeHandle=this.onChangeHandle.bind(this);
    this.checkError=this.checkError.bind(this)
        
this.onSubmit=this.onSubmit.bind(this)
        this.state={
            username:'',
            description:'',
            duration:0,
            date: new Date(),
            users:[],
            error:{}
        }
    }

  componentDidMount(){
  axios.get('http://localhost:5000/user/')
  .then(response=>{
      if(response.data.length > 0){
          this.setState({
              users:response.data.map(user =>user.username),
              
          })
      }

  })
}
    onChangeHandle(e){
        const name=e.target.name;
        const value=e.target.value;
        this.setState({
          [name]:value
        },()=>{this.checkError(name)})
      
    }

    checkError(name){
        var message = '';
        switch(name){
            case"username":
            if (this.state[name].length<=3) {
              message = "First name is required";
            
            }else {
                if (!this.state[name].match('^[a-zA-Z\\s.]*$')) {
                    message = "First name should be in alphabets";
                }
            }
            break;
            case"description":
            if (this.state[name].length<=5) {
              message = "First name is description";
            
            }
            break;
            default:
                message=""
               
              
            }
            var errorMsg = this.state.error;
            errorMsg[name] = message;
            this.setState({
                error: errorMsg
            })
            return message;
    }
   


   
    
        onSubmit(e){
            e.preventDefault();

            const exercises={
                username:this.state.username,
                description:this.state.description,
                duration:this.state.duration,
                date:this.state.date
            }

            console.log(exercises)
            
            
            axios.post('http://localhost:5000/exercises/add',exercises)
            .then(res => alert(res.data))
            
            .catch((err)=>err)
    

    
           
        }

      
    render(){
        return(
            <div className="   pl-3 row">
                <div class="col-6">
              <h3>Create New Exercise Log</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group align-item-center row">
                      <div class="col-12">
                      <label>UserName:</label>
                      <select ref="userInput"
                      required
                      className="form-control form-control-sm"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeHandle}>
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
                      name="description"
                      className="form-control form-control-sm"
                      value={this.state.description}
                      onChange={this.onChangeHandle}/>
                       <span className="error">{this.state.error.description}</span>
                  </div>
                  </div>
                  <div className="form-group align-item-center row">
                  <div class="col-12">
                      <lable>Duration(in minutes):</lable>
                      <input type="text"
                      required
                      name="duration"
                      className="form-control form-control-sm"
                      value={this.state.duration}
                      onChange={this.onChangeHandle}/>
                  </div>
                  </div>
                  <div className="form-group align-item-center row">
                  <div class="col-12">
                      <lable>Date:</lable>
                     <div>
                         <DatePicker
                         name="date"
                         selected={this.state.date}
                         onChange={
                             this.onChangeHandle
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
              
              <div className=" col-6">
                  <img src={userImage} className="img"></img>
              </div>
            </div>
          
        )
    }
}