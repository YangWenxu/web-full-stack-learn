import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_project/item/jod_listItem.dart';
import 'package:flutter_project/model/job.dart';
// import 'package:pull_to_refresh/pull_to_refresh.dart';

class JobMainScreen extends StatefulWidget {
  @override
  _JobMainScreenState createState() => new _JobMainScreenState();
}

class _JobMainScreenState extends State<JobMainScreen> {

  List<Job> _jobs = [];
  ScrollController _scrollCtrl = ScrollController();

  @override
  void initState() {  
    super.initState();

    this.getJobListData();

    _scrollCtrl.addListener(() {
      if(_scrollCtrl.position.pixels == _scrollCtrl.position.maxScrollExtent) {
        print('滑动到最底部了');
      }
    });
  }

  //获取数据
  void getJobListData() {
    setState(() {
      _jobs = Job.fromJson("""
          {
            "list": [
              {
                "name": "架构师（Android）",
                "cname": "蚂蚁金服",
                "size": "B轮",
                "salary": "25k-45k",
                "username": "Claire",
                "title": "HR"
              },
              {
                "name": "资深iOS架构师",
                "cname": "今日头条",
                "size": "D轮",
                "salary": "40k-60k",
                "username": "Kimi",
                "title": "HRBP"
              },
              {
                "name": "架构师（大前端）",
                "cname": "蚂蚁金服",
                "size": "B轮",
                "salary": "25k-45k",
                "username": "Claire",
                "title": "HR"
              },
              {
                "name": "资深Android架构师",
                "cname": "今日头条",
                "size": "D轮",
                "salary": "40k-60k",
                "username": "Kimi",
                "title": "HRBP"
              },
              {
                "name": "架构师（Android）",
                "cname": "蚂蚁金服",
                "size": "B轮",
                "salary": "25k-45k",
                "username": "Claire",
                "title": "HR"
              },
              {
                "name": "Flutter工程师",
                "cname": "今日头条",
                "size": "D轮",
                "salary": "40k-60k",
                "username": "Kimi",
                "title": "HRBP"
              }
            ]
          }
      """);
    });
  }


  @override
  Widget build(BuildContext context) {

    return new Scaffold(
      backgroundColor: Color.fromARGB(255, 242, 242, 245),
      appBar: new AppBar(
        elevation: 0.0,
        title: new Text('大前端',
          style: TextStyle(
            fontSize: 20.0, color: Colors.white
          ),
        ),
      ),
      body:RefreshIndicator(
        child: new ListView.builder(
          itemCount: _jobs.length,
          itemBuilder: buildJobItem,
          controller: _scrollCtrl,
        ),
        onRefresh: _onRefresh,
      )
    );
  }

  Future<void> _onRefresh() async{
    await Future.delayed(Duration(seconds: 3), (){
      print('_onRefresh');
    });
  }

  Widget buildJobItem(BuildContext context, int index) {

    Job job = _jobs[index];
    var jobItem = new InkWell(
      onTap: (){
        
      },
      child: new JobListItem(job),
    );

    return jobItem;
  }
}
