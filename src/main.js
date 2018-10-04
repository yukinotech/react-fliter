import React from 'react'
import {render} from 'react-dom'

let Products= [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ]

class FilterableProductTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            CheckedState:false,
            filtertext:''
        }
        this.InStockInputChange=this.InStockInputChange.bind(this)
        this.FilterTextInputChange=this.FilterTextInputChange.bind(this)
    }
    InStockInputChange(CheckedState){
        this.setState({
            CheckedState:CheckedState,
        })
    }
    FilterTextInputChange(filtertext){
        this.setState({
            filtertext:filtertext
        })
    }
    render(){
        return(
            <div>
            <SearchBar 
                CheckedState={this.state.CheckedState} 
                filtertext={this.state.filtertext}
                InStockInputChange={this.InStockInputChange}
                FilterTextInputChange={this.FilterTextInputChange}
            />
            <ProductTable 
                data={this.props.Products}
                filtertext={this.state.filtertext}
                CheckedState={this.state.CheckedState} 
            />
            </div>
        )
    }

}
class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.handleInStockInputChange=this.handleInStockInputChange.bind(this)
        this.handleFilterTextInputChange=this.handleFilterTextInputChange.bind(this)
    }
    handleInStockInputChange(e){
        this.props.InStockInputChange(e.target.checked)
    }
    handleFilterTextInputChange(e){
        this.props.FilterTextInputChange(e.target.value)
    }
    render(){
        return(
        <form>
            <input 
                type="text" 
                placeholder="Search..." 
                onChange={this.handleFilterTextInputChange}
            />
            <p>
            <input 
                type="checkbox" 
                checked={this.props.CheckedState} 
                onChange={this.handleInStockInputChange}
            />
            {' '}
            Only show products in stock
            </p>
        </form>
        )
    }
}
class ProductTable extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        var data = this.props.data
        var CheckedState=this.props.CheckedState
        var filtertext=this.props.filtertext
        var lastitem=null
        var rows=[]
        data.forEach(function(item){
            if(CheckedState===true && item.stocked===false){
                return;
            }
            if(item.name.toLowerCase().indexOf(filtertext.toLowerCase())===-1){
                return;
            }
            if(lastitem !==item.category){
            lastitem=item.category
            rows.push(<ProductCategoryRow category={item.category} />) 
            rows.push(<ProductRow price={item.price} stocked={item.stocked} name={item.name} />)
            }
            else{
            rows.push(<ProductRow price={item.price} stocked={item.stocked} name={item.name} />)
            }
        })
        return(
            <div>
                <table>
                    <thead>                       
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>   
                    </thead>           
                    <tbody> 
                        {rows} 
                    </tbody>               
                </table>
            </div>
        )
    }
}
class ProductRow extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        var name=this.props.stocked?<td>{this.props.name}</td>:<td><span style={{color: 'red'}}>{this.props.name}</span></td>
        return(
            <tr>
                {name}
                <td>{this.props.price}</td>
            </tr>
        )
    }
}
class ProductCategoryRow extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <tr>
                <td colSpan="2">{this.props.category}</td>
            </tr>
        )
    }
}
function App(){
    return(
        <FilterableProductTable Products={Products}/>
    )
}
render(
    <App/>,
    document.getElementById('root')
)




