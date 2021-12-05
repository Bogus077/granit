//TODO: length of fields

//User
const userRegistartionRules = {
  name: 'string|required',
  lastName: 'string|required',
  email: 'email|required',
  password: 'string|required',
};

const userLoginRules = {
  email: 'email|required',
  password: 'string|required',
};

const userRepeatEmailConfirmation = {
  email: 'email|required',
};

//Material
const addMaterialRules = {
  url: 'string|required',
  description: 'string|required',
  label: 'string|required',
  type: 'string|required',
};

const removeMaterialRules = {
  materialId: 'integer|required',
};

//Skill
const addSkillRules = {
  code: 'string|required',
  title: 'string|required',
  description: 'string|required',
  level: 'string|required',
  difficulty: 'numeric|required',
};

const MaterialSkillRules = {
  skillCode: 'string|required',
  materialId: 'numeric|required',
};

//Specialization
const addSpecializationRules = {
  code: 'string|required',
  name: 'string|required',
  description: 'string|required',
};

const updateSpecializationRules = {
  code: 'string|required',
  name: 'string|required',
  description: 'string|required',
};

const SkillSpecializationRules = {
  skillCode: 'string|required',
  specializationCode: 'string|required',
};

//Map
const SkillMapRules = {
  skillCode: 'string|required',
};

const MaterialMapRules = {
  materialId: 'string|required',
};

//Answer
const addAnswerRules = {
  questionId: 'string|required',
  answer: 'string|required',
};

module.exports = {
  userRegistartionRules,
  userLoginRules,
  userRepeatEmailConfirmation,
  addMaterialRules,
  removeMaterialRules,
  addSkillRules,
  MaterialSkillRules,
  addSpecializationRules,
  SkillSpecializationRules,
  SkillMapRules,
  updateSpecializationRules,
};
