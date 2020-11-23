export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  ChatRoom: undefined;
};

export type TopTabParamList = {
  Camera: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

export type CameraParamList = {
  TabOneScreen: undefined;
};

export type ChatsParamList = {
  TabTwoScreen: undefined;
};
export type StatusParamList = {
  StatusScreen: undefined;
};
export type CallsParamList = {
  CallsScreen: undefined;
};

export type User = {
  id: String;
  name: String;
  imageUri: String;
}

export type Message = {
  id: String;
  content: string;
  createdAt: string;
};

export type ChatRoom = {
  id: String;
  users: [User];
  lastMessage: Message;
}
