// import csrfFetch from "./csrf"

//(C)
export const addTask = (task) => {
        const response = await fetch(`api/task/new`,{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({...task, userId: 1})})
        if(response.ok){
            return response
        }
}
//(R)
export const getAllTasks = (userId) =>{
    const response = await fetch(`/api/users/${userId}/tasks/`)
    if(response.ok){
        return response
    }
}


export const getSingleTask = (taskId) => {
    const response = await fetch(`/api/task/${taskId}`)
    if(response.ok){
        return response
    }
}

//(U)
export const editSingleTask= (taskId) => {
    const response = await fetch(`/api/task/${taskId}`,{
        method: 'PUT',
        headers:{'Content-Type' : 'application/json'},
        body: JSON.stringify(taskId)
    })
    if(response.ok){
        return response
    }
}


//(D)
export const deleteSingleTask = (taskId)=>{
    const response = await fetch(`/api/task/${taskId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok){
      return response
    }
}

// export const addSingleReview = (review) => async(dispatch) =>{
//     console.log(review)
//     const response = await csrfFetch(`/api/business/${review.businessId}/${review.userId}/review/new`, {
//             method: 'POST',
//             headers:{'Content-Type': 'application/json'},
//             body: JSON.stringify(review)            
//         })
//         console.log(review)
//         if(response.ok){
//             const newReview = await response.json()
//             dispatch(addReview(newReview))
//             return newReview
//         }
// }

// export const updateReview = (review) => async(dispatch) =>{
//     const payload = { answer: review.answer, rating: review.rating}
//     const response = await csrfFetch(`/api/business/${review.businessId}/reviews/${review.id}`,
//     {
//         method: 'PUT',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(payload)
//     })
//     if(response.ok){
//         dispatch(getSingleBusiness(review.businessId))
//     }
// }

// export const deleteReview = (review) => async(dispatch) =>{
//     const response = await csrfFetch(`/api/business/${review.businessId}/reviews/${review.id}`, {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify()
//     })

//     if(response.ok){
//         dispatch(getSingleBusiness(review.businessId))
//     }
// }
