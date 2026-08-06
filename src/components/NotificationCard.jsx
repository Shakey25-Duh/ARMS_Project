function NotificationCard({ notifications }) {

    return (

        <div className="card shadow">

            <div className="card-header bg-primary text-white">

                <h5 className="mb-0">

                    Recent Notifications

                </h5>

            </div>

            <div className="card-body">

                <ul className="list-group">

                    {

                        notifications.map((item, index) => (

                            <li
                                key={index}
                                className="list-group-item"
                            >

                                {item}

                            </li>

                        ))

                    }

                </ul>

            </div>

        </div>

    );

}

export default NotificationCard;