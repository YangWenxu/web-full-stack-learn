import 'package:flutter/material.dart';
import 'package:flutter_project/model/companylist_item.dart';


class CompanyListItem extends StatelessWidget {

  final Company companyModel;

  CompanyListItem(this.companyModel);

  @override
  Widget build(BuildContext context) {
    return Padding(
      // padding: EdgeInsets.all(value),
      // padding: EdgeInsets.fromLTRB(5, 3, 5, 3),
      // padding: EdgeInsets.only(
      //   top: 3,
      //   left: 5,
      //   right: 5,
      //   bottom: 3
      // ),

      padding: EdgeInsets.symmetric(
        horizontal: 5.0,
        vertical: 3.0
      ),
    
      child: Card(
        elevation: 10,
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
                     bottom: 0
                   ),
                   child: Image.network(
                     companyModel.logo,
                     width: 50.0,
                     height: 50.0,
                   ),
                 ),
                 Padding(
                   padding: EdgeInsets.all(5),
                   child: Text(
                     companyModel.location.substring(0, companyModel.location.length>8 
                     ? 8:companyModel.location.length),
                     style: TextStyle(fontSize: 13.0, color: Colors.grey),
                   ),
                 ),
                 Padding(
                   padding: EdgeInsets.only(
                     top: 5.0,
                     left: 5.0,
                     right: 10.0,
                     bottom: 5
                   ),
                   child: Column(
                     crossAxisAlignment: CrossAxisAlignment.start,
                     mainAxisAlignment: MainAxisAlignment.start,
                     children: <Widget>[
                       Text(
                         '|'+companyModel.type,
                         style: TextStyle(fontSize: 13.0, color: Colors.grey),
                       ),
                       Text(
                         '|'+companyModel.size,
                         style: TextStyle(fontSize: 13.0, color: Colors.grey),
                       ),
                       Text(
                         '|'+companyModel.employee,
                         style: TextStyle(fontSize: 13.0, color: Colors.grey),
                       ),
                     ],
                   ),
                 )

               ],
             ),
            //  Divider(color: Colors.red, indent: 20, endIndent: 20, thickness: 10),
            Divider(),
            Row(
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.only(
                    top: 5.0,
                    bottom: 10.0,
                    left: 10.0,
                    right: 10.0,
                  ),
                  child: Text(
                    '热招：'+ 
                    companyModel.hot + 
                    '等' + companyModel.count + '个职位',
                    style: TextStyle(fontSize: 13.0, color: Theme.of(context).primaryColor),
                  ),
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.only(
                          bottom: 8.0
                        ),
                        child: Icon(
                          Icons.keyboard_arrow_right,
                          color: Colors.grey
                        ),
                      ),
                    ],
                  ),
                )
              ],
            )
           ],
         ),
      )


    );
  }
}