<template>
  <div class="form-create-course-container">
    <el-row :gutter="20">
      <el-col :span="15">
        <h3>Thông tin cơ bản</h3>
        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
          <el-form-item label="Tên khoá học" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Thời lượng khoá học" prop="duration">
            <div class="duration-field">
              <div class="field" style="margin-right: 10px; width: 70%;">
                <el-input v-model="form.duration" />
              </div>
              <div class="field">
                <el-select
                  v-model="form.durationType"
                  placeholder="Lựa chọn đơn vị thời gian"
                  style="width: 30%;"
                >
                  <el-option label="giây" value="giây" />
                  <el-option label="phút" value="phút" />
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="Ngày bắt đầu" prop="startDate">
            <el-date-picker
              v-model="form.startDate"
              type="date"
              placeholder="Lựa chọn thời gian học"
              style="width: 49.4%;"
            />
          </el-form-item>
          <el-form-item label="Ngày kết thúc" prop="endDate">
            <el-date-picker
              v-model="form.endDate"
              type="date"
              placeholder="Lựa chọn thời gian học"
              style="width: 49.4%;"
            />
          </el-form-item>
          <el-form-item label="Thông điệp ngắn" prop="shortMessage">
            <el-input v-model="form.shortMessage" />
          </el-form-item>
          <el-form-item label="Mô tả" prop="description">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
          <el-form-item label="Trạng thái" prop="status">
            <el-switch v-model="form.status" />
          </el-form-item>
          <el-form-item label="Độ tuổi tối thiểu" prop="minAge">
            <el-input style="width: 49.4%;" v-model="form.minAge" />
          </el-form-item>
          <el-form-item label="Hình ảnh" prop="picture">
            <el-upload
              :file-list="form.picture"
              :limit="1"
              :auto-upload="false"
              action="https://test.io"
              style="display: flex"
            >
              <el-button style="margin-right: 10px;">
                Chọn hình ảnh
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button @click="onCancel">
              Huỷ
            </el-button>
            <el-button type="primary" @click="onSubmit('form')">
              Cập nhật
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="9">
        <h3>Danh sách giáo viên</h3>

        <div class="grid-content bg-purple"></div>
        <div class="grid-content bg-purple-light">
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            fit
            highlight-current-row
            :show-header="false"
          >
            <el-table-column align="center" width="95">
              <template slot-scope="scope">
                <div class="block">
                  <el-avatar
                    :size="50"
                    :src="scope.row.courseImageUrl"
                  ></el-avatar>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div>
                  <b>
                    {{ scope.row.name }}
                  </b>
                </div>
                <div style="font-size: 12px">
                  {{ scope.row.authors }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="110" align="center">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-time" />
                <span>{{ (scope.row.duration / 60).toFixed() }} phút</span>
              </template>
            </el-table-column>
            <el-table-column width="90" align="center">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-user-solid"></i>
                {{ scope.row.teachers }}
              </template>
            </el-table-column>
            <el-table-column width="80" align="center">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-user-solid"></i>
                {{ scope.row.members }}
              </template>
            </el-table-column>
            <el-table-column align="center" width="80">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-notebook-2" />
                <span>{{ scope.row.lessons }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="80">
              <template slot-scope="scope">
                <i
                  class="icon-desc el-icon-s-data"
                  style="transform: rotate(90deg)"
                />
                <span>{{ scope.row.quizzes }}</span>
              </template> </el-table-column
            ><el-table-column align="center" width="90">
              <template slot-scope="scope">
                {{ scope.row.progress || 0 }} %
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" width="110" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status" disabled> </el-switch>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button @click="handleEditCourse(scope.row.id)"
                  >Cài đặt</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15">
        <h3>Danh sách bài học</h3>
        <div class="grid-content bg-purple-light">
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            fit
            highlight-current-row
            :show-header="false"
          >
            <el-table-column align="center" width="95">
              <template slot-scope="scope">
                <div class="block">
                  <el-avatar
                    :size="50"
                    :src="scope.row.courseImageUrl"
                  ></el-avatar>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div>
                  <b>
                    {{ scope.row.name }}
                  </b>
                </div>
                <div style="font-size: 12px">
                  {{ scope.row.authors }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="110" align="center">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-time" />
                <span>{{ (scope.row.duration / 60).toFixed() }} phút</span>
              </template>
            </el-table-column>
            <el-table-column width="90" align="center">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-user-solid"></i>
                {{ scope.row.teachers }}
              </template>
            </el-table-column>
            <el-table-column width="80" align="center">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-user-solid"></i>
                {{ scope.row.members }}
              </template>
            </el-table-column>
            <el-table-column align="center" width="80">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-notebook-2" />
                <span>{{ scope.row.lessons }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="80">
              <template slot-scope="scope">
                <i
                  class="icon-desc el-icon-s-data"
                  style="transform: rotate(90deg)"
                />
                <span>{{ scope.row.quizzes }}</span>
              </template> </el-table-column
            ><el-table-column align="center" width="90">
              <template slot-scope="scope">
                {{ scope.row.progress || 0 }} %
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" width="110" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status" disabled> </el-switch>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button @click="handleEditCourse(scope.row.id)"
                  >Cài đặt</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="9">
        <h3>Danh sách học sinh</h3>
        <div class="grid-content bg-purple-light">
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            fit
            highlight-current-row
            :show-header="false"
          >
            <el-table-column align="center" width="95">
              <template slot-scope="scope">
                <div class="block">
                  <el-avatar
                    :size="50"
                    :src="scope.row.courseImageUrl"
                  ></el-avatar>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div>
                  <b>
                    {{ scope.row.name }}
                  </b>
                </div>
                <div style="font-size: 12px">
                  {{ scope.row.authors }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="110" align="center">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-time" />
                <span>{{ (scope.row.duration / 60).toFixed() }} phút</span>
              </template>
            </el-table-column>
            <el-table-column width="90" align="center">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-user-solid"></i>
                {{ scope.row.teachers }}
              </template>
            </el-table-column>
            <el-table-column width="80" align="center">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-user-solid"></i>
                {{ scope.row.members }}
              </template>
            </el-table-column>
            <el-table-column align="center" width="80">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-notebook-2" />
                <span>{{ scope.row.lessons }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="80">
              <template slot-scope="scope">
                <i
                  class="icon-desc el-icon-s-data"
                  style="transform: rotate(90deg)"
                />
                <span>{{ scope.row.quizzes }}</span>
              </template> </el-table-column
            ><el-table-column align="center" width="90">
              <template slot-scope="scope">
                {{ scope.row.progress || 0 }} %
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" width="110" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status" disabled> </el-switch>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button @click="handleEditCourse(scope.row.id)"
                  >Cài đặt</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  courseAction,
  COURSE_NAMESPACE,
  CREATE_COURSE,
  GET_COURSE
} from '@/store/course/action.type'
import store from '@/store/index'
import { mapGetters } from 'vuex'
import { log } from 'node:console'

export default Vue.extend({
  name: 'UpdateCourse',
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(courseAction(GET_COURSE), to.params.courseId)
    next()
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ],
        duration: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ],
        date: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ],
        description: [
          { max: 5000, message: 'Tối đa 5000 kí tự', trigger: 'change' }
        ],
        minAge: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ],
        maximumAge: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    formRef(
      formName: string
    ): Vue & { validate: (func: (valid: boolean) => boolean) => void } {
      return this.$refs[formName] as Vue & {
        validate: (func: (valid: boolean) => boolean) => void
      }
    },

    // onSubmit(formName: string) {
    //   this.formRef(formName).validate((valid: boolean) => {
    //     if (valid) {
    //       const courseTobeCreated = {
    //         description: this.form.description,
    //         duration: this.form.duration,
    //         endDate: this.form.endDate,
    //         fileId: null,
    //         image: '',
    //         minAge: this.form.minAge,
    //         name: this.form.name,
    //         shortMessage: this.form.shortMessage,
    //         startDate: this.form.startDate,
    //         status: this.form.status ? 'ENABLE' : 'DISABLE'
    //       }
    //       store.dispatch(courseAction(CREATE_COURSE), courseTobeCreated)
    //       alert('submit!')
    //       return true
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },

    onCancel() {
      this.$router.push({
        path: '/course/index'
      })
    }

    // pictureUrl() {
    //   return this.form.picture[0] ? this.form.picture[0] : ''
    // }
  },

  computed: {
    ...mapGetters(COURSE_NAMESPACE, ['course']),
    form() {
      if (this.course && this.course.data) {
        const data = this.course.data
        console.log(data)

        return {
          ...data,
          startDate: data.startDate
            .split('-')
            .reverse()
            .join('-'),
          endDate: data.endDate
            .split('-')
            .reverse()
            .join('-'),
          durationType: 'giây'
        }
      }
      return {}
    },
    list() {
      return this.course.data.lessons
    }
  }
})
</script>

<style lang="scss" scoped>
.form-create-course {
  &-container {
    margin: 30px;

    .duration-field {
      display: flex;

      .field {
        flex: 1 0;
      }
    }
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
