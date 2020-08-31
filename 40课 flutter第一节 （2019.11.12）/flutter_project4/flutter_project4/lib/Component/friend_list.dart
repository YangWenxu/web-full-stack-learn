import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_project4/Component/friend.dart';

class FriendListPage extends StatefulWidget {

  @override
  _FriendListPageState createState() => new _FriendListPageState();

}

class _FriendListPageState extends State<FriendListPage> {

  List<Friend> _friends = [];

  var httpClient = new HttpClient();
  var url = 'https://randomuser.me/api/?results=40';

  @override
  void initState() {
    super.initState();

    _loadFriendsData();

  }

  _loadFriendsData() async{
    HttpClientRequest request = await httpClient.getUrl(Uri.parse(url));

    HttpClientResponse response = await request.close();

    if(response.statusCode == 200) {
      var jsonString = await response.transform(utf8.decoder).join();

      setState(() {
        _friends = Friend.resloveDataFromResponse(jsonString);
      });
    }

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: new AppBar(title: new Text('好友列表')),
      body: new Center(
        child: ListView.builder(
          itemCount: _friends.length,
          itemBuilder: (BuildContext context, int index) {
            var friend = _friends[index];
            return Text(friend.name);
          },
        )
      ),
    );
  }

}