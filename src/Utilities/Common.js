import {environmentVariables} from '../config'
export const ratingStandards = {
    'Good':{
        color: 'rgba(85, 168, 79,1)',
        backgroundColor:'rgba(85, 168, 79, 0.2)',
        range: '0-50'
    },
    'Satisfactory':{
        color:'rgba(163, 200, 83,1)',
        backgroundColor:'rgba(163, 200, 83, 0.2)',
        range: '51-100'
    },
    'Moderate':{
        color:'rgba(255, 248, 50,1)',
        backgroundColor:'rgba(255, 248, 50, 0.2)',
        range: '100-200'
    },
    'Poor':{
        color:'rgba(242, 156, 50,1)',
        backgroundColor:'rgba(242, 156, 50, 0.2)',
        range: '201-300'

    },
    'Very Poor':{
        color:'rgba(233, 63, 51,1)',
        backgroundColor:'rgba(233, 63, 51, 0.2)',
        range: '301-400'
    },
    'Severe':{
        color:'rgba(175, 45, 36,1)',
        backgroundColor:'rgba(175, 45, 36, 0.2)',
        range: '401-500'
    }
}

export const exportCities={
  'Bengaluru':{borderColor:'rgba(12, 132, 165, 1)', backgroundColor:'rgba(12, 132, 165, 0.4)',label:'Bengaluru'},
  'Bhubaneswar':{borderColor:'rgba(247, 200, 95, 1)',backgroundColor:'rgba(247, 200, 95, 0.4)',label:'Bhubaneswar'},
  'Chandigarh':{borderColor:'rgba(111, 77, 124, 1)',backgroundColor:'rgba(111, 77, 124, 0.4)',label:'Chandigarh'},
  'Chennai':{borderColor:'rgba(159, 216, 102, 1)',backgroundColor:'rgba(159, 216, 102, 0.4)',label:'Chennai'},
  'Delhi'	:{borderColor:'rgba(202, 71, 47, 1)',backgroundColor:'rgba(202, 71, 47, 0.4)',label:'Delhi'},
  'Hyderabad':{borderColor:'rgba(255, 159, 86, 1)',backgroundColor:'rgba(255, 159, 86, 0.4)',label:'Hyderabad'},
  'Indore':{borderColor:'rgba(141, 221, 208, 1)',backgroundColor:'rgba(141, 221, 208, 0.4)',label:'Indore'},
  'Jaipur':{borderColor:'rgba(255, 131, 0, 1)',backgroundColor:'rgba(255, 131, 0, 0.4)',label:'Jaipur'},
  'Kolkata':{borderColor:'rgba(246, 35, 148, 1)',backgroundColor:'rgba(246, 35, 148, 0.4)',label:'Kolkata'},
  'Lucknow':{borderColor:'rgba(188, 0, 112, 1)',backgroundColor:'rgba(188, 0, 112,0.4)',label:'Lucknow'},
  'Mumbai':{borderColor:'rgba(97, 45, 145, 1)',backgroundColor:'rgba(97, 45, 145, 0.4)',label:'Mumbai'},
  'Pune':{borderColor:'rgba(1, 183, 0, 1)',backgroundColor:'rgba(1, 183, 0,  0.4)',label:'Pune'},
  }

  export const tableHeadings = ['City','Current','Last Updated']
export function SetParams(score, currentCity){
    score = parseFloat(score).toFixed(2)
      if(score <= 50){
        return {score,color:ratingStandards['Good'].color,backgroundColor:ratingStandards['Good'].backgroundColor,currentRating: 1, previousRating:  (currentCity && currentCity.currentRating) || 1, currentTimestamp: new Date() }
      }else if(score>50 && score<=100){
        return {score,color:ratingStandards['Satisfactory'].color,backgroundColor:ratingStandards['Satisfactory'].backgroundColor,currentRating: 2, previousRating:  (currentCity && currentCity.currentRating) || 2, currentTimestamp: new Date() }
      }else if(score>100 && score<=200){
        return {score,color:ratingStandards['Moderate'].color,backgroundColor:ratingStandards['Moderate'].backgroundColor,currentRating: 3, previousRating:  (currentCity && currentCity.currentRating)|| 3,currentTimestamp: new Date() } 
      }else if(score>200 && score<=300){
        return {score,color:ratingStandards['Poor'].color ,backgroundColor:ratingStandards['Poor'].backgroundColor,currentRating: 4, previousRating:  (currentCity && currentCity.currentRating) || 4, currentTimestamp: new Date() } 
      }else if(score>300 && score<=400){
        return {score,color:ratingStandards['Very Poor'].color,backgroundColor:ratingStandards['Very Poor'].backgroundColor,currentRating: 5, previousRating:  (currentCity && currentCity.currentRating) || 5, currentTimestamp: new Date() } 
      }else{
          return {score,color:ratingStandards['Severe'].color,backgroundColor:ratingStandards['Severe'].backgroundColor,currentRating: 6, previousRating:  (currentCity && currentCity.currentRating) || 6, currentTimestamp: new Date() }
     }
  }

 export function GetlastUpdated(date){
    let difference = parseInt((Math.abs(new Date() - new Date(date)))/1000);
    if(difference<60){
      return 'a few seconds ago'
    }
    else{
      if(difference<3600){
        if(difference>=60 && difference<120){
          return 'a minute ago'
        }else{
         return `${parseInt(difference/60)} minutes ago`
        }
      }
      else{
        difference = parseInt(difference/60)
        if(difference === 1){
           return 'an hour ago'
        }
        else{
         return `${parseInt(difference/60)} hours ago`
        }
      }
    }
 
  }
  export function getEnv(key){
    const env = process.env.NODE_ENV
    return process.env[key] || environmentVariables[env][key]
  }