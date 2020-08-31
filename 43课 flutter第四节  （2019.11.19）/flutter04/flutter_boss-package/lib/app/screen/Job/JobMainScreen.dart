import 'package:flutter/material.dart';
import 'package:flutter_boss/app/item/joblist_item.dart';
import 'package:flutter_boss/app/model/job.dart';

class JobMainScreen extends StatefulWidget {
  @override
  JobMainScreenState createState() => new  JobMainScreenState();
}

class JobMainScreenState extends State<JobMainScreen> {

  List<Job> _jobs = [];

  @override
  void initState() {  
    super.initState();

    this.getJobListData();
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
      body: new ListView.builder(
        itemCount: _jobs.length,
        itemBuilder: buildJobItem,
      ),
    );
  }

  Widget buildJobItem(BuildContext context, int index) {

    // Job job = _jobs[index];
    // return new Container(
    //   child: Text(
    //     job.name
    //   ),
    // );

    Job job = _jobs[index];
    var jobItem = new InkWell(
      onTap: (){
        showDialog(context: context, child: new AlertDialog(
          content: new Text(
            '敬请期待！',
            style: TextStyle(
              fontSize:20.0
            )
          ),
        ));
      },
      child: new JobListItem(job),
    );

    return jobItem;
  }

}