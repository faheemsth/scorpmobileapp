import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Bottomsheet from '../../components/bottom-sheet'
import datalayer from '../../../datalayer/datalayer'

const ViewTask = ({id, onClose}) => {
  const [task, setTask] = useState(undefined)
  useEffect(()=>{
    fetchAsync = async()=>{
      const taskDetails = await datalayer.taskLayer.getTaskDetails(id).then(e=>{
        console.log("taskDetailsRsponse", e)
      }).catch(console.error)
      setTask(taskDetails)
    }
    fetchAsync().catch(console.error)
  },[id])
  return (
    <Bottomsheet
      onClose={onClose}
    >
      {!!!task ? <Text>Loading...</Text> : (<></>)}
    </Bottomsheet>
  )
}

export default ViewTask