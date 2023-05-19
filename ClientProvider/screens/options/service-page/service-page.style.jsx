import { StyleSheet } from "react-native";

export default ({ props }) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  cover: { 
    flex:1, 
    width: undefined, 
    height: undefined
  },
  name: {
    fontFamily:'notosans', 
    fontSize:25, 
    letterSpacing:-1.5, 
    fontVariant:['small-caps'], 
    lineHeight:28
  },
  location: {
    fontFamily:'quicksand-light', 
    fontSize:12, 
    letterSpacing:-0.5, 
    lineHeight:13
  },
  gradient: {
    borderRadius: 20, 
    paddingHorizontal: 16, 
    paddingVertical: 6
  },
  type: {
    fontFamily:'lexend-light',
    letterSpacing:-0.7, 
    fontSize:14, 
    color:'#FFFFFF', 
    lineHeight:18
  },

  leftRate: {
    alignItems:'center', 
    height:90, 
    paddingHorizontal:20,
    borderRightWidth:0.6, 
    justifyContent:'center'
  },
  rightRate: { 
    height:75, 
    flex:1,
    alignSelf: 'center',
  },
  number: {
    fontFamily:'quicksand-light', 
    fontSize:13, width:9, lineHeight:15, 
    marginHorizontal:10
  },
  basebar: {
    height:13, 
    width:'90%', 
    backgroundColor:'#EFEFEF', 
    borderRadius:7
  },
  
  bar1: {
    height:13, 
    width:props.p1, 
    backgroundColor:'#9C54D5', 
    borderRadius:7, 
    marginLeft:'-90%'
  },
  bar2: {
    height:13, 
    width:props.p2, 
    backgroundColor:'#9C54D5', 
    borderRadius:7, 
    marginLeft:'-90%'
  },
  bar3: {
    height:13, 
    width:props.p3, 
    backgroundColor:'#9C54D5', 
    borderRadius:7, 
    marginLeft:'-90%'
  },
  bar4: {
    height:13, 
    width:props.p4, 
    backgroundColor:'#9C54D5', 
    borderRadius:7, 
    marginLeft:'-90%'
  },
  bar5: {
    height:13, 
    width:props.p5, 
    backgroundColor:'#9C54D5', 
    borderRadius:7, 
    marginLeft:'-90%'
  },

  ratings: {
    fontFamily:'quicksand-medium', 
    fontSize:28, 
    lineHeight:38, 
    marginLeft:4
  },
  review: {
    fontFamily:'quicksand-light', 
    fontSize:16, 
    letterSpacing:-0.5, 
    lineHeight:20, 
    marginTop:5
  },

  subheader: {
    fontFamily:'notosans', 
    fontVariant:['small-caps'], 
    fontSize:22, 
    letterSpacing:-0.5, 
    color:'#9C54D5'
  },
  title: {
    fontFamily:'quicksand-medium', 
    letterSpacing:-0.4, 
    fontSize:15,textAlign:'center', 
    marginTop:12
  },
  subtitle: {
    fontFamily:'quicksand-light', 
    letterSpacing:-0.4, 
    fontSize:12, 
    textAlign:'center'
  }
});