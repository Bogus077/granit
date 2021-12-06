//Models
const User = require('./User');
// const Map = require('./Map');
// const Skill = require('./Skill');
// const Specialization = require('./Specialization');
// const Material = require('./Material');
// const Role = require('./Role');
// const ActivationCode = require('./ActivationCode');
// const ResetPassword = require('./ResetPassword');

// const MapSkill = require('./MapSkill');
// const MapMaterial = require('./MapMaterial');
// const SpecializationSkill = require('./SpecializationSkill');
// const SkillMaterial = require('./SkillMaterial');
// const UserRole = require('./UserRole');
// const Question = require('./Question');
// const UserAnswer = require('./UserAnswer');

//Associations
// User.hasOne(Map, { foreignKey: 'user_id' });
// User.hasOne(ActivationCode, { foreignKey: 'user_id' });
// User.hasMany(ResetPassword, { foreignKey: 'user_id' });
// User.hasMany(UserAnswer, { foreignKey: 'user_id' });
// User.belongsToMany(Question, { through: UserAnswer, foreignKey: 'user_id' });
// Question.belongsToMany(User, { through: UserAnswer, foreignKey: 'question_id' });

// User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id' });
// Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id' });

// Skill.belongsToMany(Map, { through: MapSkill, foreignKey: 'skill_id' });
// Map.belongsToMany(Skill, { through: MapSkill, foreignKey: 'map_id' });

// Material.belongsToMany(Map, { through: MapMaterial, foreignKey: 'material_id' });
// Map.belongsToMany(Material, { through: MapMaterial, foreignKey: 'map_id' });

// Skill.belongsToMany(Material, { through: SkillMaterial, foreignKey: 'skill_id' });
// Material.belongsToMany(Skill, { through: SkillMaterial, foreignKey: 'material_id' });

// Specialization.belongsToMany(Skill, { through: SpecializationSkill, foreignKey: 'spec_id' });
// Skill.belongsToMany(Specialization, { through: SpecializationSkill, foreignKey: 'skill_id' });

// Question.hasMany(Answer, { foreignKey: 'id' });

// Answer.hasOne(Question);

module.exports = {
  User,
  // Map,
  // Skill,
  // Specialization,
  // Material,
  // MapSkill,
  // SpecializationSkill,
  // SkillMaterial,
  // Role,
  // UserRole,
  // ActivationCode,
  // ResetPassword,
  // Question,
  // UserAnswer,
};
