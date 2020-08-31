import 'package:flutter/material.dart';
import 'package:flutter_boss/app/model/company.dart';

class CompanyListItem extends StatelessWidget {
  
  final Company companyModel;

  //构造器
  CompanyListItem(this.companyModel);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        top: 3.0,
        left: 5.0,
        right: 5.0,
        bottom: 3.0,
      ),
      child: SizedBox(
        child: Card(
          elevation: 0.0,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Row(
                children: <Widget>[
                  Padding(
                    padding: EdgeInsets.only(
                      top: 10.0,
                      left: 15.0,
                      right: 15.0,
                      bottom: 0.0,
                    ),
                    child: Image.network(
                      companyModel.logo,
                      width: 50.0,
                      height: 50.0,
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(
                      top: 5.0,
                      left: 0.0,
                      right: 5.0,
                      bottom: 5.0,
                    ),
                    child: Text(
                      //这里容易超索引
                      companyModel.location.substring(
                          0, companyModel.location.length > 6 ? 6 : 3),
                      style: TextStyle(fontSize: 13.0, color: Colors.grey),
                      overflow: TextOverflow.ellipsis,
                      textAlign: TextAlign.center,
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(
                      top: 5.0,
                      left: 5.0,
                      right: 10.0,
                      bottom: 5.0,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          "|"+companyModel.type,
                          style: TextStyle(fontSize: 13.0, color: Colors.grey),
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.center,
                        ),
                        Text(
                          "|" + companyModel.size,
                          style: TextStyle(fontSize: 13.0, color: Colors.grey),
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.center,
                        ),
                        Text(
                          "|" + companyModel.employee,
                          style: TextStyle(fontSize: 13.0, color: Colors.grey),
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.center,
                        )
                      ],
                    ),
                  ),
                ],
              ),
              Divider(),
              Row(
                children: <Widget>[
                  new Padding(
                    padding: const EdgeInsets.only(
                      top: 5.0,
                      left: 10.0,
                      right: 5.0,
                      bottom: 15.0,
                    ),
                    child: new Text(
                        "热招：" +
                            companyModel.hot +
                            " 等" +
                            companyModel.count +
                            "个职位",
                        style:
                            new TextStyle(fontSize: 13.0, color: Colors.grey)),
                  ),
                  new Expanded(
                      child: new Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: <Widget>[
                      new Padding(
                        padding: const EdgeInsets.only(
                          bottom: 8.0
                        ),
                        child: const Icon(
                          Icons.keyboard_arrow_right,
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ))
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

}