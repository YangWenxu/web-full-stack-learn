import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:scoped_model/scoped_model.dart';

class MineMain extends StatefulWidget {
  @override
  _MineMainState createState() => new _MineMainState();
}

class _MineMainState extends State<MineMain> {

  // int _count = 0;
  // void _increaseCount() {
  //     setState(() {
  //       _count += 1;
  //     });
  // }

  @override
  Widget build(BuildContext context) {
    return ScopedModel(
      model: CounterModel(),
      child: Scaffold(
        backgroundColor: Color.fromARGB(255, 242, 242, 245),
        appBar: new AppBar(
          elevation: 0.0,
          title: new Text('大前端',
            style: TextStyle(
              fontSize: 20.0, color: Colors.white
            ),
          ),
          ),
          body: MiddleCounter(),
          floatingActionButton: ScopedModelDescendant<CounterModel>(
            rebuildOnChange: false,
            builder: (context, _, model) => FloatingActionButton(
            child: Icon(Icons.add),
            onPressed: model.increaseCount,
            )
          ),
        ),
    );
  }

}

class MiddleCounter extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Counter(),
      ),
    );
  }
}

class Counter extends StatelessWidget {

  // int count = 0;
  // VoidCallback increaseCount;

  // Counter({Key key, this.count, this.increaseCount}) : super(key: key);

  @override
  Widget build(BuildContext context) {

    return ScopedModelDescendant<CounterModel>(
      builder: (context, _, model) => Center(
        child: GestureDetector(
          onTap: model.increaseCount,
          child: Text(
            '${model.count}',
            style: TextStyle(
              fontSize: 50.0,
              fontWeight: FontWeight.bold,
              color: Colors.blue
          )),
        ),
      ),
    );
  }
}

class CounterModel extends Model {
  int _count = 0;
  int get count => _count;

  void increaseCount() {
    _count += 1;
    //通知更新小部件
    notifyListeners();
  }

}
