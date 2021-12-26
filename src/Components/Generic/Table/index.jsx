import './index.css'
export default function Table(props){
    return(<table>
        <thead>
            <tr style={props.headings.style||{}}>
                {props.headings.data.map((heading)=>{
                    return(<th key={heading}>{heading}</th>)
                })}
            </tr>
        </thead>
        <tbody>
            {props.body.map((content,j) => {
                return(<tr key={`tr-${j}`} style={content.style}>
                    {content.data.map((col,i) =>{
                        return(<td key={`tr-${j}-td-${i}`}style={col.style}>{col.data}</td>)
                    })}
                </tr>)
            })}
        </tbody>
    </table>)
}