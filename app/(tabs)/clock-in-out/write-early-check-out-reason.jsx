import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import Bottomsheet from "../../components/bottom-sheet";
import InputField from "../../components/input-field";
import Btn from "../../components/btn";
import datalayer from "../../../datalayer/datalayer";

const WriteEarlyCheckoutReason = ({ onClose }) => {
  const [reason, setReason] = useState("")
  const clockOut = async () => {
    const done = await datalayer.attendanceLayer.clockOut(reason).catch(e=>Alert.alert("Error", e?.["message"]))
    console.log("clockout inside reason", done)
    onClose?.()
  };
  return (
    <Bottomsheet
      handleComponent={() => (
        <Text
          style={{
            padding: 15,
            width: "100%",
            backgroundColor: "#167BC4",
            color: "#fff",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          Reason For Early Clock Out
        </Text>
      )}
      onClose={onClose}
      style={{ padding: 0, contentContainer: { padding: 0 }, elevation: 4 }}
    >
      <InputField
        multiline={true}
        placeholder={"Reason for early Clock-Out..."}
        style={{
          height: 157,
          marginVertical: 12,
        }}
        value={reason}
        onChange={setReason}
      />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: 10,
          gap: 5,
        }}
      >
        <Btn
          title={"Cancel"}
          handleClick={onClose}
          style={{ backgroundColor: "#0002", elevation: 0 }}
        />
        <Btn
          title={"Clock Out"}
          handleClick={clockOut}
          style={{ elevation: 0 }}
          gradientColors={["#6C6C6C","#D5213C"]}
        />
      </View>
    </Bottomsheet>
  );
};

export default WriteEarlyCheckoutReason;
