function SystemStatus({ status }) {
    return (
        <div className="card shadow">

            <div className="card-header bg-success text-white">
                <h5 className="mb-0">System Status</h5>
            </div>

            <div className="card-body">

                <table className="table">

                    <tbody>

                        {status.map((item, index) => (

                            <tr key={index}>

                                <th>{item.title}</th>

                                <td>{item.value}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default SystemStatus;