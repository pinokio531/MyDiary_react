import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigator';
import uuid from 'uuid/v4';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {

  state = {
    inputTitle:'',
    inputContent: '',
    selectedDate: '',
    imageUrl : '',
    Posts : [{
      id : 'abcd-efg1',
      title :'8월 1일에 쓴 글',
      content :'입니다',
      date :'20190801',
      image: '',
    },{
      id :'abcd-efg2',
      title :'8월 2일에 쓴 글',
      content :'입니다',
      date :'20190802',
      image: '',
    }]
  }

	_selectPicture = async () => {
		// 현재 사용하는 플랫폼이 ios라면 사진의 접근권한을 체크합니다.
	  if(Platform.OS == 'ios'){
	    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			// 접근 권한이 허용되지 않았다면, 권한 허용을 요청합니다.
	    if (status !== 'granted') {
	      alert('설정 > expo > 사진 읽기 및 쓰기 허용을 설정해주세요.');
	    }
	  }
	// 사진을 받아와, 정보를 저장합니다.
  const result = await ImagePicker.launchImageLibraryAsync({allowsEditing:true});
	// 사진의 uri를 state에 설정합니다.
  this.setState({imageUrl: result.uri});
}

  _getToday = () => {
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = (date.getMonth()+1).toString();
    let day = date.getDate().toString();

    if(month.length == 1) month = "0"+month;
    if(day.length == 1) day = "0"+day;

    return year+month+day;
  }
  
  _addPost = () => {
    let id = uuid();
    const today = this._getToday();
    const prevPosts = [...this.state.Posts];
    const newPost = {
      id:id
      ,title:this.state.inputTitle
      ,content:this.state.inputContent
      ,date: today
      ,image : this.state.imageUrl
    }
    
    
    console.log("새로운 아이디"+newPost.id);
  
    this.setState({
      inputTitle: '',
      inputContent: '',
      selectedDate: today,
      imageUrl : '',
      Posts: prevPosts.concat(newPost)
    });
  }


  _changeTitle = (value) => {
    this.setState({
      inputTitle: value
    });
  }
  
  _changeContent = (value) => {
    this.setState({
      inputContent: value
    });
  }


  _changeDate = (value) => {
    let year = value._i.year.toString();
    let month = (value._i.month+1).toString();
    let day = value._i.day.toString();

    if(month.length == 1) month = "0" + month;
    if(day.length == 1) day = "0" + day;

    this.setState({
      selectedDate: year+month+day
    })
  }

  _deletePost = (id) => {
    const prevPosts = [...this.state.Posts];
    deleteIndex = prevPosts.findIndex((item) => {return item.id == id});
    deletePost = prevPosts.splice(deleteIndex,1);
    this.setState({Posts:prevPosts});
  }

  render(){
    return(
      <Navigation
      screenProps={{
        inputTitle: '',
        inputContent: '',
        Posts: this.state.Posts,
        selectedDate: this.state.selectedDate,
        changeDate: this._changeDate,
        changeTitle: this._changeTitle,
        changeContent: this._changeContent,
        changeTitle : this._changeTitle,
        changeConteng : this._changeContent,
        addPost : this._addPost,
        imageUrl: this.state.imageUrl,
        selectPicture: this._selectPicture,
      }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
