const BASE_URL = "https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1";
let total = 0;

const processTemplate = (template, index) => ({
  id: index + 1,
  template_name: template.name,
  description: template.description,
  categories: template.category,
  template_link: template.link,
  date_created: template.created,
});

// get match the filtered category with the category array
const getCategory = (value) => (content) => {
  const res = content.category.find((item) => item === value);
  return res;
};

//fetch the data using this endpoint
export const fetchTemplateData = async () => {
  const response = await fetch(`${BASE_URL}/public/task_templates`);

  if (response.ok) {
    const data = await response.json();
    const templates = data.map(processTemplate);
    total = templates.length;

    return { templates, total };
  } else {
    const error_msg = await response.json();
    throw new Error(error_msg);
  }
};

export const filterTemplateData = async (templates, filter_val) => {
  try {
    const template_data = templates;
    const result = template_data.filter(getCategory(filter_val));
    total = result.length;

    return { result, total };
  } catch (error) {
    throw new Error(error);
  }
};
