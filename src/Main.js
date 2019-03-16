import React, { Component } from 'react';

class Main extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="post-preview">
                            <h2 className="post-title">
                                Welcome to The Burritt Cup
                    </h2>
                            <h3 className="post-subtitle">
                                What is The Burritt Cup?
                    </h3>
                            <p className="post-meta">The Burritt Cup is a once a year gathering of friends to accomplish the difficult
                                task of golf. The quest for the Cup is accomplished on the third round of golf by playing a scramble
                                format. The teams are chosen at random by the Rules Commissioner. The first, second and fourth
                                rounds of the three-day weekend consist of 18 hole golf each round that determine the other awards
                        of the weekend.</p>
                            <h3 className="post-subtitle">
                                When is The Burritt Cup?
                    </h3>
                            <p className="post-meta">The Burritt Cup is held in June or July every year as decided by the players.</p>
                            <h3 className="post-subtitle">
                                Where is The Burritt Cup?
                    </h3>
                            <p className="post-meta">The Burritt Cup is held in different golf resorts in the Midwest. The players
                                choose the location based on amenities. Locations have included the ritzy Coachman's in Wisconsin
                        and the dumpy Geneva National.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;