import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class MessageMain extends StatefulWidget {
  @override
  _MessageMainState createState() => new _MessageMainState();
}

class _MessageMainState extends State<MessageMain> {

  int _count = 0;
  void _increaseCount() {
      setState(() {
        _count += 1;
      });
  }

  @override
  Widget build(BuildContext context) {
    return CounterProvider(
          count: _count,
          increaseCount: _increaseCount,
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
          floatingActionButton: FloatingActionButton(
            child: Icon(Icons.add),
            onPressed: _increaseCount,
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

    //获取CounterProvider提供的数据
    final int count = CounterProvider.of(context).count;
    final VoidCallback increaseCount = CounterProvider.of(context).increaseCount;

    return Center(
        child: GestureDetector(
          onTap: increaseCount,
          child: Text(
            '$count',
            style: TextStyle(
              fontSize: 50.0,
              fontWeight: FontWeight.bold,
              color: Colors.blue
          )),
        ),
      );
  }
}

class CounterProvider extends InheritedWidget {
  final int count;
  final VoidCallback increaseCount;
  final Widget child;

  CounterProvider({
    this.count,
    this.increaseCount,
    this.child
   });

  static CounterProvider of(BuildContext context) => 
  context.inheritFromWidgetOfExactType(CounterProvider);

  @override
  //决定是否重建新的小部件
  bool updateShouldNotify(InheritedWidget oldWidget) {
    return true;
  }
}
