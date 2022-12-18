import React, {ChangeEvent} from 'react';

type ProfileStatusPropsType = {
  status: string
  updateStatus: (newStatus: string) => void
}

type StateType = {
  editMode: boolean
  status: string
}

class ProfileStatus extends React.Component<ProfileStatusPropsType, StateType> {

 constructor(props:ProfileStatusPropsType) {
     super(props);
     this.state = {
         editMode: false,
         status: this.props.status
     }
 }

  activateEditMode = () => {
    this.setState({
      editMode: true
    });
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: StateType ) {
    if(prevProps.status !== this.props.status){
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <>
        {!this.state.editMode &&
        <div>
          <span onClick={this.activateEditMode}>{this.props.status || 'No status'} </span>
        </div>
        }
        {this.state.editMode &&
        <div>
          <input onChange={this.onStatusChange}
                 autoFocus={true}
                 onBlur={this.deactivateEditMode}
                 value={this.state.status}/>
               </div>
        }
      </>
    )
  }
}

export default ProfileStatus;