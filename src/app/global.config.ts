
const baseConfig = {
  baseUrl: "http://my-server.com/service"
};

export const globalConfig = {

  api: {
    getQuestionnaire: `${baseConfig.baseUrl}/survey?id={id}`,
    getSummary: `${baseConfig.baseUrl}/summary?id={id}`,
    saveQuestionnaire: `${baseConfig.baseUrl}/survey-result`,
    getTeams: `${baseConfig.baseUrl}/projects`
  }
};
