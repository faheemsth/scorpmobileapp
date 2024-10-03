import { View, Text } from "react-native";
import React, { useState } from "react";
import Bottomsheet from "../../components/bottom-sheet";
import Btn from "../../components/btn";
import InputField from "../../components/input-field";

const TaskField = ({ label, placeholder, value, onChange, trailing }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginVertical: 8,
      }}
    >
      <Text style={{ flex: 0.5 }}>{label}</Text>
      <InputField
        style={{ flex: 1, backgroundColor: "#0002", marginEnd: 0 }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        trailing={trailing}
      />
    </View>
  );
};

const CreateTask = ({ onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [brands, setBrands] = useState("");
  const [region, setRegion] = useState("");
  const [branch, setBranch] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [remainderDate, setRemainderDate] = useState("");
  return (
    <Bottomsheet onClose={onClose}>
      <Text style={{ fontSize: 20, fontWeight: 500 }}>Create Task</Text>
      <Text
        style={{
          fontFamily: "outfit-400",
          fontSize: 15,
          paddingVertical: 10,
          width: "100%",
          borderBottomWidth: 1,
          borderStyle: "dashed",
          borderColor: "#0006",
        }}
      >
        Task Details
      </Text>

      <View
        style={{
          marginVertical: 16,
        }}
      >
        <TaskField
          label={"Task Name"}
          placeholder={"Task Name"}
          value={taskName}
          onChange={setTaskName}
        />
        <TaskField
          label={"Task Name"}
          placeholder={"Task Name"}
          value={taskName}
          onChange={setTaskName}
        />
        <TaskField
          label={"Task Name"}
          placeholder={"Task Name"}
          value={taskName}
          onChange={setTaskName}
        />
        <TaskField
          label={"Task Name"}
          placeholder={"Task Name"}
          value={taskName}
          onChange={setTaskName}
        />
        <TaskField
          label={"Task Name"}
          placeholder={"Task Name"}
          value={taskName}
          onChange={setTaskName}
        />
        <TaskField
          label={"Task Name"}
          placeholder={"Task Name"}
          value={taskName}
          onChange={setTaskName}
        />
        <TaskField
          label={"Task Name"}
          placeholder={"Task Name"}
          value={taskName}
          onChange={setTaskName}
        />
        <TaskField
          label={"Task Name"}
          placeholder={"Task Name"}
          value={taskName}
          onChange={setTaskName}
        />
        <TaskField
          label={"Task Name"}
          placeholder={"Task Name"}
          value={taskName}
          onChange={setTaskName}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "end",
          alignContent: "end",
          justifyContent: "flex-end",
          gap: 10,
          width: "100%",
        }}
      >
        <Btn
          handleClick={onClose}
          title="Cancel"
          style={{ backgroundColor: "#0001", color: "black", elevation: 0 }}
        />
        <Btn title="Create" style={{ elevation: 0 }} />
      </View>
    </Bottomsheet>
  );
};

export default CreateTask;
