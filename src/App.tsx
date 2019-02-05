import React, { Component, SyntheticEvent } from 'react';
import {from, fromEvent, fromEventPattern, Subject, combineLatest, BehaviorSubject, of, Observable} from 'rxjs';
import {delay, map} from 'rxjs/operators'
import { Input, Select, InputNumber } from 'antd';
import './App.css';
const Option = Select.Option;
const InputGroup = Input.Group;
interface State {
  result: number
}

class App extends Component<{}, State> {

  private fieldVarSubject = new BehaviorSubject<number>(1);
  private fieldLimitSubject = new BehaviorSubject<number>(1);
  private field1Subject = new BehaviorSubject<number>(4);
  private field2Subject = new BehaviorSubject<number>(3);
  private PLengthSubject = new BehaviorSubject<number>(40);
  private PWidthSubject = new BehaviorSubject<number>(40);
  private BLengthSubject = new BehaviorSubject<number>(10);
  private BWidthSubject = new BehaviorSubject<number>(10);
  private ILengthSubject = new BehaviorSubject<number>(10);
  private IWidthSubject = new BehaviorSubject<number>(10);
  
  private observer = new Observable(

  )
  constructor(props: any) {
    super(props);
    this.state = {
      result: 0
    }
  }

  componentDidMount = () => {
    combineLatest(
      this.fieldVarObservable,
      this.fieldLimitSubject,
      this.field1Subject,
      this.field2Subject,
      this.PLengthSubject,
      this.PWidthSubject,
      this.BLengthSubject,
      this.BWidthSubject,
      this.ILengthSubject,
      this.IWidthSubject
    )
    .pipe(
      map((arr:Array<number>) => {
        console.log(arr)
        const [
          c_var, o_limit,
          r_length, r_width,  /* размеры комнаты (длина-ширина) */
          p_length, p_width,  /* размеры плитки (длина-ширина) */
          b_length, b_width,  /* размеры бордюра (длина-ширина) */
          i_length, i_width] = arr;

        var p_area = 0;
        var b_count = 0;
        var i_count = 0;
        var area = r_length * r_width;
        var p_sq = (p_length * p_width) / 10000;
        var b_sq = (b_length * b_width) / 10000;
        var i_sq = (i_length * i_width) / 10000;
  
        switch (c_var) {
          case 1:
              p_area = area * o_limit;
            break;
          case 2:
              p_area = area * o_limit;
            break;
          case 3:
              i_count = Math.round(area / (p_sq + i_sq));
              p_area = (area * o_limit) - (i_count * i_sq);
            break;
          case 4:
              i_count = Math.round(area / (p_sq + (2 * b_sq) + i_sq));
              b_count = i_count * 2;
              p_area =  (area * o_limit) - (b_count * b_sq) - (i_count * i_sq);
			    break;
  }
  console.log(p_area)
	  return +p_area.toFixed(2);
      })
    )
    .subscribe(x => {
      this.setState({
        ...this.state,
        result: x
      })
    })
  }
  private onChangeParamLength = (value: number | undefined) => {
    return value;
    // if (value) {
    //   of(value)
    //   // .next(value);
    // }
  } 
  private fieldVarObservable = of(this.onChangeParamLength)

  private onChangeParamWidth = (value: number | undefined) => {
    if (value) {
      this.field2Subject.next(value);
    }
  } 
  private handleVarChange = (value: string) => {
    if (value) {
      this.fieldVarSubject.next(+value);
    }
  }
  private handleLimitChange = (value: string) => {
    if (value) {
      this.fieldLimitSubject.next(+value);
    }
  }
  private onChangePLength = (value: number | undefined) => {
    if (value) {
      this.PLengthSubject.next(value);
    }
  }
  private onChangePWidth = (value: number | undefined) => {
    if (value) {
      this.PWidthSubject.next(value);
    }
  }
  private onChangeBLength = (value: number | undefined) => {
    if (value) {
      this.BLengthSubject.next(value);
    }
  }
  private onChangeBWidth = (value: number | undefined) => {
    if (value) {
      this.BWidthSubject.next(value);
    }
  }
  private onChangeIParamLength = (value: number | undefined) => {
    if (value) {
      this.ILengthSubject.next(value);
    }
  }
  private onChangeIWidth = (value: number | undefined) => {
    if (value) {
      this.IWidthSubject.next(value);
    }
  }
  render() {
    return (<div>
      <InputNumber defaultValue={3} placeholder="Введите длину" onChange={this.onChangeParamLength}></InputNumber>
      <InputNumber defaultValue={4}  placeholder="Введите ширину" onChange={this.onChangeParamWidth}></InputNumber>
      <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleVarChange}>
        <Option value="1">Вариант 1</Option>
        <Option value="2">Вариант 2</Option>
        <Option value="3">Вариант 3</Option>
        <Option value="4">Вариант 4</Option>
      </Select>
      <Select defaultValue="1.1" style={{ width: 120 }} onChange={this.handleLimitChange}>
        <Option value="1">0%</Option>
        <Option value="1.05">5%</Option>
        <Option value="1.07">7%</Option>
        <Option value="1.1">10%</Option>
        <Option value="1.15">15%</Option>
      </Select>
      <InputGroup compact>
          <InputNumber style={{ width: '50%' }} defaultValue={40} onChange={this.onChangePLength}/>
          <InputNumber style={{ width: '50%' }} defaultValue={40} onChange={this.onChangePWidth}/>
      </InputGroup>
      <InputGroup compact>
          <InputNumber style={{ width: '50%' }} defaultValue={10} onChange={this.onChangeBLength}/>
          <InputNumber style={{ width: '50%' }} defaultValue={10} onChange={this.onChangeBWidth}/>
      </InputGroup>
      <InputGroup compact>
          <InputNumber style={{ width: '50%' }} defaultValue={10} onChange={this.onChangeIParamLength}/>
          <InputNumber style={{ width: '50%' }} defaultValue={10} onChange={this.onChangeIWidth}/>
      </InputGroup>
      <div>{this.state.result}</div>
    </div>
    
    );
  }
}

export default App;
