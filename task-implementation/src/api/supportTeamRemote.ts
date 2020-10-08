import supportTeam from '../assets/api.json';

import SupportMember from '../models/SupportMember';

const SIMULATED_FETCH_DELAY_TIME: number = 200;

const supportTeamRequestHandler = {

  getAvailableSupportTeam: (firstName?: string): Promise<Array<SupportMember>> => {

    return new Promise((resolve, reject) => {

      let team: Array<SupportMember> = supportTeam;

      if (firstName) {

        team = supportTeam.filter((member: SupportMember) => {
          return member.firstName.indexOf(firstName.toLowerCase()) > 0;
        });

      }

      setTimeout(() => {
        resolve(team);
      }, SIMULATED_FETCH_DELAY_TIME);

    });
  }
};

export default supportTeamRequestHandler;