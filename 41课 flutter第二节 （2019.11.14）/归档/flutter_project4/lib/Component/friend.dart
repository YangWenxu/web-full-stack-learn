import 'dart:convert';

import 'package:flutter/material.dart';

class Friend {
  @required final String avatar;
  @required final String name;
  @required final String email;

  //构造函数
  Friend({this.avatar, this.name, this.email});

  //从jsonString 转换成 List<Friend>

  static List<Friend> resloveDataFromResponse(String resonseData) {
    var json = jsonDecode(resonseData);
    var results = json['results'];
    var listResult = results
    .map((obj)=>Friend.fromMap(obj))
    .toList()
    .cast<Friend>();

    return listResult;
  }

  static Friend fromMap(Map map) {
    var name = map['name'];

    return new Friend(
      avatar: map['picture']['large'],
      name: '${name['first']} ${name['last']}',
      email: map['email']
    );
  }


}