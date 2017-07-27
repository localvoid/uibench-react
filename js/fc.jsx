import React from 'react';
import ReactDOM from 'react-dom';

const TableCell = ({ text }) => {
  function onClick(e) {
    console.log('Clicked' + text);
    e.stopPropagation();
  }

  return <td className="TableCell" onClick={onClick}>{text}</td>;
}

const TableRow = ({ data }) => {
  return (
    <tr className={data.active ? 'TableRow active' : 'TableRow'} data-id={data.id}>
      <TableCell text={'#' + data.id}></TableCell>
      {data.props.map((c, i) => <TableCell key={i} text={c}></TableCell>)}
    </tr>
  );
}

const Table = ({ data }) => <table className="Table"><tbody>
  {data.items.map((i) => <TableRow key={i.id} data={i} />)}
</tbody></table>;

const AnimBox = ({ data }) => <div className="AnimBox" data-id={data.id} style={{
  borderRadius: (data.time % 10).toString() + 'px',
  background: 'rgba(0,0,0,' + (0.5 + ((data.time % 10) / 10)).toString() + ')'
}} />;

const Anim = ({ data }) => <div className="Anim">{data.items.map((i) => <AnimBox key={i.id} data={i} />)}</div>;

const TreeLeaf = ({ data }) => <li className="TreeLeaf">{data.id}</li>;

const TreeNode = ({ data }) => (
  <ul className="TreeNode">
    {data.children.map((c) => c.container ? <TreeNode key={c.id} data={c} /> : <TreeLeaf key={c.id} data={c} />)}
  </ul>
);

const Tree = ({ data }) => <div className="Tree"><TreeNode data={data.root} /></div>;

const Main = ({ data }) => {
  const location = data.location;

  var section;
  if (location === 'table') {
    section = <Table data={data.table}></Table>;
  } else if (location === 'anim') {
    section = <Anim data={data.anim}></Anim>;
  } else if (location === 'tree') {
    section = <Tree data={data.tree}></Tree>;
  }

  return <div className="Main">{section}</div>;
};

uibench.init('React[FC]', React.version);

document.addEventListener('DOMContentLoaded', function (e) {
  const container = document.querySelector('#App');

  uibench.run(
    function (state) {
      ReactDOM.render(<Main data={state} />, container);
    },
    function (samples) {
      ReactDOM.render(<pre>{JSON.stringify(samples, null, ' ')}</pre>, container);
    }
  );
});
